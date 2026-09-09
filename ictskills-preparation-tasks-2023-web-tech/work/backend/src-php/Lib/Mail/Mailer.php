<?php

namespace Skills17\Lib\Mail;

use PHPMailer\PHPMailer\PHPMailer;

class Mailer
{
    /**
     * Send an email.
     *
     * @param string $email Receiver address
     * @param string $subject Email subject
     * @param mixed $message Body of email message
     */
    public function send(string $email, string $subject, string $message)
    {
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);

        //Server settings
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host       = 'localhost';
        $mail->Port       = 1025;

        //Recipients
        $mail->setFrom('swissskills@test.local');
        $mail->addAddress($email);

        //Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
    }
}
