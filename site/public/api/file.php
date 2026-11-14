<?php
// Download link for drawings that were too large to attach to the quote email (see form.php).
// The link carries a random 32-character token; files are deleted after keep_days.
declare(strict_types=1);

$C = require __DIR__ . '/config.php';
header('X-Content-Type-Options: nosniff');
header('Cache-Control: private, no-store');
header('X-Robots-Tag: noindex');

$t = (string) ($_GET['t'] ?? '');
$f = basename((string) ($_GET['f'] ?? ''));
$path = $C['data_dir'] . "/files/$t/$f";
if (!preg_match('/^[0-9a-f]{32}$/', $t) || $f === '' || $f[0] === '.' || !is_file($path)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    exit("This link has expired or is wrong. Ask the buyer to send the drawing again.\n");
}
$name = preg_replace('/^\d{2}-/', '', $f);
header('Content-Type: application/octet-stream');
header('Content-Length: ' . filesize($path));
header("Content-Disposition: attachment; filename=\"" . preg_replace('/[^\x20-\x7E]|"/', '_', $name) . "\"; filename*=UTF-8''" . rawurlencode($name));
readfile($path);
