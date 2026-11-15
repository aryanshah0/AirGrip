<?php
// Receives the quote and contact forms (multipart POST from the site) and emails them to sales.
// Quote requests (form = rfq | rfq-quick) also get a copy sent to the buyer, as the thank-you page promises.
// Answers JSON: 200 {"ok":true} or 4xx/5xx {"ok":false,"error":"..."}; the site shows its own message on failure.
declare(strict_types=1);

$C = require __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function answer(int $code, string $error = ''): void
{
    http_response_code($code);
    echo json_encode($error === '' ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

function logline(array $C, string $what): void
{
    @file_put_contents($C['data_dir'] . '/log.txt', gmdate('Y-m-d H:i:s') . " UTC\t" . $what . "\n", FILE_APPEND | LOCK_EX);
}

/** One line for a mail header: no line breaks (header injection), trimmed, capped. */
function one_line(string $s, int $max = 200): string
{
    return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', $s)), 0, $max);
}

function mime_word(string $s): string
{
    return preg_match('/[^\x20-\x7E]/', $s) ? '=?UTF-8?B?' . base64_encode($s) . '?=' : $s;
}

/** Sends a plain-text UTF-8 email, with attachments [['name' => , 'path' => ]]. Returns true if handed to the mailer. */
function send_mail(array $C, string $to, string $subject, string $text, string $replyTo, array $files = []): bool
{
    $from = $C['from'];
    $headers = [
        'From: ' . mime_word($C['from_name']) . " <$from>",
        "Reply-To: $replyTo",
        'MIME-Version: 1.0',
        'X-Mailer: airgrip-form',
    ];
    $textPart = "Content-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($text));
    if (!$files) {
        $headers[] = "Content-Type: text/plain; charset=UTF-8";
        $headers[] = "Content-Transfer-Encoding: base64";
        $body = chunk_split(base64_encode($text));
    } else {
        $b = 'ag-' . bin2hex(random_bytes(12));
        $headers[] = "Content-Type: multipart/mixed; boundary=\"$b\"";
        $body = "--$b\r\n$textPart";
        foreach ($files as $f) {
            $name = mime_word($f['name']);
            $body .= "--$b\r\nContent-Type: application/octet-stream; name=\"$name\"\r\n"
                . "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"$name\"\r\n\r\n"
                . chunk_split(base64_encode((string) file_get_contents($f['path'])));
        }
        $body .= "--$b--\r\n";
    }
    return mail($to, mime_word($subject), $body, implode("\r\n", $headers), '-f' . $from);
}

function rrmdir(string $dir): void
{
    foreach (glob($dir . '/*') ?: [] as $f) { is_dir($f) ? rrmdir($f) : @unlink($f); }
    @rmdir($dir);
}

// ---------------------------------------------------------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') answer(405, 'POST only');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $C['origins'], true)) answer(403, 'origin');

if (!is_dir($C['data_dir']) && !@mkdir($C['data_dir'], 0700, true)) answer(500, 'storage');
@file_put_contents($C['data_dir'] . '/.htaccess', "Require all denied\n"); // in case data_dir ends up inside the web root

// A request over PHP's post_max_size arrives with $_POST and $_FILES empty.
if (!$_POST && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) answer(413, 'too large');

// Rate limit per IP (hashed, never stored in clear).
$ipKey = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|airgrip');
$rateFile = $C['data_dir'] . '/rate-' . substr($ipKey, 0, 32);
$now = time();
$hits = array_filter(array_map('intval', explode(',', (string) @file_get_contents($rateFile))), fn($t) => $t > $now - 3600);
if (count($hits) >= $C['per_hour']) answer(429, 'too many requests');
$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits), LOCK_EX);

// Remove saved drawings older than keep_days, and stale rate files.
foreach (glob($C['data_dir'] . '/files/*', GLOB_ONLYDIR) ?: [] as $d) {
    if (filemtime($d) < $now - $C['keep_days'] * 86400) rrmdir($d);
}
foreach (glob($C['data_dir'] . '/rate-*') ?: [] as $f) { if (filemtime($f) < $now - 7200) @unlink($f); }

// --- fields --------------------------------------------------------------------------------------------------
$FORMS = [
    'rfq' => ['ref', 'items', 'drawings', 'parts', 'material', 'finish', 'tolerance', 'plating_thickness', 'samples_by',
        'incoterm', 'destination', 'first_delivery', 'notes', 'name', 'company', 'email', 'phone', 'country',
        'ppap_level3', 'reach_statement', 'nda', 'consent'],
    'rfq-quick' => ['ref', 'name', 'company', 'email', 'phone', 'country', 'qty_order', 'qty_year', 'nda', 'consent'],
    'contact' => ['name', 'company', 'email', 'phone', 'topic', 'message', 'consent'],
];
$LONG = ['items', 'drawings', 'parts', 'notes', 'message'];
$LABEL = [
    'ref' => 'Reference', 'items' => 'Part codes', 'drawings' => 'Drawings', 'parts' => 'Parts (NDA, drawings follow)',
    'material' => 'Material', 'finish' => 'Finish', 'tolerance' => 'Tolerance', 'plating_thickness' => 'Plating thickness',
    'samples_by' => 'Samples needed by', 'incoterm' => 'Incoterm', 'destination' => 'Destination',
    'first_delivery' => 'First production delivery', 'notes' => 'Notes', 'name' => 'Name', 'company' => 'Company',
    'email' => 'Email', 'phone' => 'Phone', 'country' => 'Country', 'qty_order' => 'Quantity per order',
    'qty_year' => 'Quantity per year', 'ppap_level3' => 'PPAP level 3', 'reach_statement' => 'REACH statement',
    'nda' => 'NDA first', 'consent' => 'Privacy consent', 'topic' => 'Topic', 'message' => 'Message',
];

$form = (string) ($_POST['form'] ?? '');
if (!isset($FORMS[$form])) answer(400, 'form');
$v = [];
foreach ($FORMS[$form] as $k) {
    $raw = (string) ($_POST[$k] ?? '');
    $v[$k] = in_array($k, $LONG, true)
        ? mb_substr(trim(str_replace("\r", '', $raw)), 0, 8000)
        : one_line($raw);
}
$page = one_line((string) ($_POST['page'] ?? ''), 120);

foreach (['name', 'company', 'email'] as $k) if ($v[$k] === '') answer(400, $k);
// Addresses with non-ASCII characters (jürgen@müller-gmbh.de) are valid: the domain is converted to its ASCII
// form (xn--…); a non-ASCII local part is accepted, but not put into mail headers (see $replyTo).
$at = strrpos($v['email'], '@');
if ($at !== false && function_exists('idn_to_ascii') && preg_match('/[^\x20-\x7e]/', substr($v['email'], $at + 1))) {
    $dom = idn_to_ascii(substr($v['email'], $at + 1), IDNA_DEFAULT, INTL_IDNA_VARIANT_UTS46);
    if ($dom !== false) $v['email'] = substr($v['email'], 0, $at + 1) . $dom;
}
if (!filter_var($v['email'], FILTER_VALIDATE_EMAIL, FILTER_FLAG_EMAIL_UNICODE)) answer(400, 'email');
$asciiEmail = !preg_match('/[^\x20-\x7e]/', $v['email']);
if ($v['consent'] !== 'yes') answer(400, 'consent');
if ($form !== 'contact') {
    if ($v['country'] === '') answer(400, 'country');
    if (!preg_match('/^RFQ-\d{2}-[2-9A-Z]{6}$/', $v['ref'])) answer(400, 'ref');
}
if ($form === 'contact' && $v['message'] === '') answer(400, 'message');

// --- drawings ----------------------------------------------------------------------------------------------
$TYPES = ['pdf', 'dwg', 'dxf', 'step', 'stp', 'igs', 'iges', 'jpg', 'jpeg', 'png'];
$files = [];
$skipped = [];
if ($form !== 'contact' && isset($_FILES['files']) && is_array($_FILES['files']['name'])) {
    $F = $_FILES['files'];
    foreach ($F['name'] as $i => $orig) {
        $name = mb_substr(preg_replace('/[^\w.\- ()]+/u', '_', basename((string) $orig)), -120);
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if ($F['error'][$i] !== UPLOAD_ERR_OK || !is_uploaded_file($F['tmp_name'][$i])) { $skipped[] = "$name (upload failed)"; continue; }
        if (!in_array($ext, $TYPES, true)) { $skipped[] = "$name (type not accepted)"; continue; }
        if ($F['size'][$i] > 20 * 1048576) { $skipped[] = "$name (over 20 MB)"; continue; }
        if (count($files) >= 20) { $skipped[] = "$name (more than 20 files)"; continue; }
        $files[] = ['name' => $name, 'path' => $F['tmp_name'][$i], 'size' => (int) $F['size'][$i]];
    }
}
// PHP drops uploads beyond max_file_uploads before this script runs; the browser says how many it sent.
$claimed = (int) ($_POST['file_count'] ?? 0);
$arrived = isset($_FILES['files']) && is_array($_FILES['files']['name']) ? count($_FILES['files']['name']) : 0;
if ($claimed > $arrived) $skipped[] = ($claimed - $arrived) . ' more file(s) were sent but did not arrive (limit ' . ini_get('max_file_uploads') . ' files per request)';
if (($v['nda'] ?? '') === 'yes' && $files) { $skipped = array_merge($skipped, array_map(fn($f) => $f['name'] . ' (NDA: not accepted before signing)', $files)); $files = []; }
if ($form === 'rfq-quick') $v['drawings'] = implode("\n", array_map(fn($f) => $f['name'], $files));

// Too large to attach: save them outside the web root and send download links instead.
$attach = $files;
$links = [];
$total = array_sum(array_column($files, 'size'));
if ($files && $total > $C['attach_total_mb'] * 1048576) {
    $token = bin2hex(random_bytes(16));
    $dir = $C['data_dir'] . '/files/' . $token;
    if (!@mkdir($dir, 0700, true)) answer(500, 'storage');
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $base = $scheme . '://' . ($_SERVER['HTTP_HOST'] ?? 'airgrip.co.in') . dirname($_SERVER['SCRIPT_NAME']) . '/file.php';
    foreach ($files as $n => $f) {
        $stored = sprintf('%02d-%s', $n + 1, $f['name']);
        if (!move_uploaded_file($f['path'], "$dir/$stored")) answer(500, 'storage');
        $links[] = $f['name'] . ' (' . round($f['size'] / 1048576, 1) . " MB)\n  $base?t=$token&f=" . rawurlencode($stored);
    }
    $attach = [];
}

// --- email to sales ------------------------------------------------------------------------------------------
$kind = ['rfq' => 'Quote request', 'rfq-quick' => 'Quick quote request', 'contact' => 'Message'][$form];
$subject = $kind . ($form !== 'contact' ? ' ' . $v['ref'] : '') . ' - ' . $v['company'] . (($v['country'] ?? '') !== '' ? ' (' . $v['country'] . ')' : '');
$lines = ["$kind from the website" . ($page !== '' ? " (page $page)" : ''), ''];
foreach ($FORMS[$form] as $k) {
    if ($v[$k] === '' || $k === 'consent') continue;
    $lines[] = in_array($k, $LONG, true) ? $LABEL[$k] . ":\n  " . str_replace("\n", "\n  ", $v[$k]) : $LABEL[$k] . ': ' . $v[$k];
}
if ($links) $lines = array_merge($lines, ['', "Drawings were too large to attach. Download them (links work for {$C['keep_days']} days):"], $links);
elseif ($attach) $lines[] = "\n" . count($attach) . ' drawing(s) attached.';
if ($skipped) $lines = array_merge($lines, ['', 'Not received:'], $skipped);
$lines[] = "\nThe buyer agreed to the privacy policy. Reply to this email to answer them.";

if (!$asciiEmail) $lines[] = 'Note: the buyer\'s address has non-ASCII characters, so it is not set as Reply-To. Write to ' . $v['email'] . ' directly.';
if (!send_mail($C, $C['to'], $subject, implode("\n", $lines), $asciiEmail ? $v['email'] : $C['to'], $attach)) {
    logline($C, "$form\t" . ($v['ref'] ?? '') . "\tFAILED to send to sales");
    answer(502, 'mail');
}

// --- copy to the buyer (quote requests only; the contact form promises no copy) ---------------------------
$copy = 'no copy';
if ($form !== 'contact') {
    $sent = array_filter([$v['items'] ?? '', $v['drawings'] ?? '', $v['parts'] ?? '']);
    $t = [
        'Thank you. We received your quote request and will reply within two working days',
        '(Saturday to Thursday, 09:30-18:30 IST).',
        '',
        'Reference: ' . $v['ref'],
        'You sent:',
        '  ' . ($sent ? str_replace("\n", "\n  ", implode("\n", $sent))
            : ($form === 'rfq-quick' ? 'Your contact details' . (($q = implode(' · ', array_filter([$v['qty_order'] !== '' ? $v['qty_order'] . ' / order' : '', $v['qty_year'] !== '' ? $v['qty_year'] . ' / year' : '']))) !== '' ? " · $q" : '')
                : 'A note describing the part') . ($v['nda'] === 'yes' ? ' (drawings follow after the NDA)' : '')),
    ];
    if ($v['nda'] === 'yes') array_push($t, '', 'NDA: send us your NDA by email to ' . $C['to'] . '. We sign and return it; then reply to that email with your drawings.');
    array_push($t, '', 'Sending a sample? Courier it to ' . $C['address'] . '. Mark the parcel with your company name and the reference above.',
        '', 'Questions: reply to this email, or call ' . $C['phone'] . '.', '', 'AirGrip, Jamnagar, India', 'https://airgrip.co.in');
    $copy = send_mail($C, $v['email'], 'Your quote request ' . $v['ref'] . ' to AirGrip', implode("\n", $t), $C['to']) ? 'copy sent' : 'copy FAILED';
}

logline($C, "$form\t" . ($v['ref'] ?? '') . "\tsent\t" . count($files) . ' file(s)' . ($links ? ' as links' : '') . "\t$copy");
answer(200);
