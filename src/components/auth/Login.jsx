import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OTPVerification from './OTPVerification';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [useOTP, setUseOTP] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    const handleOTPVerified = async (phoneNumber) => {
        try {
            await login({ phoneNumber, type: 'otp' });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Welcome Back</h2>
            <div className="auth-methods">
                <button 
                    className={!useOTP ? 'active' : ''} 
                    onClick={() => setUseOTP(false)}
                >
                    Email Login
                </button>
                <button 
                    className={useOTP ? 'active' : ''} 
                    onClick={() => setUseOTP(true)}
                >
                    Phone Login
                </button>
            </div>

            {useOTP ? (
                <OTPVerification onVerified={handleOTPVerified} />
            ) : (
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            )}

            {error && <p className="error-message">{error}</p>}
            
            <p className="auth-switch">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;