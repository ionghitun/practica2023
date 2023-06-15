<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 *
 */
class ForgotPassword extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected $email, protected $token)
    {
        $this->email = encrypt($email);
        $this->token = encrypt($token);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array
     */
    public function via(): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @return MailMessage
     */
    public function toMail(): MailMessage
    {
        $url = url(env('WEB_URL') . '/change-password?token=' . $this->token . '&hash=' . $this->email);

        return (new MailMessage())->subject('Forgot password')
            ->line('Please click the link bellow to reset your password!')
            ->action('Reset Password', $url)
            ->line('If you have trouble clicking the link you can copy and access this url: ' . $url);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array
     */
    public function toArray(): array
    {
        return [];
    }
}
