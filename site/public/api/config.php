<?php
// Settings for the form sender (form.php) and the large-file download (file.php). Change here, upload again.
return [
    // Where requests go, and the mailbox on this hosting they are sent from (create it in hPanel > Emails).
    'to'   => 'sales@airgrip.in',
    'from' => 'website@airgrip.co.in',
    'from_name' => 'AirGrip website',
    // Mail is sent by logging in to that mailbox over SMTP (so SPF/DKIM/DMARC pass). Its password lives only on the
    // server, in this file (one line, chmod 600), never in the repo. Without the file, PHP mail() is used.
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 465,
    'smtp_pass_file' => dirname($_SERVER['DOCUMENT_ROOT'] ?: __DIR__ . '/..') . '/airgrip-forms/smtp-password.txt',

    // Only forms on these sites may post (stops other sites using this script).
    'origins' => ['https://airgrip.co.in', 'https://www.airgrip.co.in'],

    // Requests, logs and drawings too large to attach are kept here, OUTSIDE public_html.
    'data_dir' => dirname($_SERVER['DOCUMENT_ROOT'] ?: __DIR__ . '/..') . '/airgrip-forms',

    // Drawings are attached while their total stays under this size; above it they are saved and the email
    // carries a download link instead (mail servers usually refuse messages over 20-25 MB).
    'attach_total_mb' => 15,
    // Saved drawings and their links are deleted after this many days (privacy policy: kept only as long as needed).
    'keep_days' => 60,

    // Per visitor (IP address): at most this many requests per hour.
    'per_hour' => 10,

    // Text for the copy sent to the buyer.
    'phone' => '+91 93166 15007',
    'address' => 'Plot No. 3966 & 3967, Road No. U, GIDC Phase-III, Dared, Jamnagar 361004, Gujarat, India',
];
