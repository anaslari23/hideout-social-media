import React, { useState } from 'react';
import authService from '../../services/authService';

const OTPVerification = ({ onVerified }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [error, setError] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            await authService.sendOTP(phoneNumber);
            setStep('otp');
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send OTP');
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            await authService.verifyOTP(phoneNumber, otp);
            onVerified(phoneNumber);
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid OTP');
        }
    };

    return (
        <div className="otp-verification">
            {step === 'phone' ? (
                <form onSubmit={handleSendOTP}>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        required
                    />
                    <button type="submit">Send OTP</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOTP}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        maxLength="6"
                        required
                    />
                    <button type="submit">Verify OTP</button>
                    <button 
                        type="button" 
                        onClick={() => handleSendOTP()}
                        className="resend-btn"
                    >
                        Resend OTP
                    </button>
                </form>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default OTPVerification;