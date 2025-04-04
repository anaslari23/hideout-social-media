const twilio = require('twilio');
const pool = require('../config/db');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const otpService = {
    generateOTP: () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },

    sendOTP: async (phoneNumber) => {
        const otp = otpService.generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await pool.query(
            'INSERT INTO otp_verification (phone_number, otp_code, expires_at) VALUES ($1, $2, $3)',
            [phoneNumber, otp, expiresAt]
        );

        await client.messages.create({
            body: `Your OTP is: ${otp}. Valid for 10 minutes.`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        return true;
    },

    verifyOTP: async (phoneNumber, otp) => {
        const result = await pool.query(
            'SELECT * FROM otp_verification WHERE phone_number = $1 AND otp_code = $2 AND expires_at > NOW() AND is_verified = false',
            [phoneNumber, otp]
        );

        if (result.rows.length > 0) {
            await pool.query(
                'UPDATE otp_verification SET is_verified = true WHERE id = $1',
                [result.rows[0].id]
            );
            return true;
        }
        return false;
    }
};

module.exports = otpService;