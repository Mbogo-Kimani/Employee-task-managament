<?php
namespace App\Helpers;

class ApiLib {
    public static function createRandomPassword(int $length)
    {
        return bin2hex(openssl_random_pseudo_bytes($length));
    }

    public static function createVerificationToken(int $length)
    {
        return substr(bin2hex(random_bytes($length)), 0, $length);
    }
    public static function createOTPVerificationCode(int $length)
    {
        $otp = '';
        for ($i = 0; $i < $length; $i++) {
            $otp .= random_int(0, 9);
        }
        return $otp;
    }
}