import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handleNext = async (e) => {
    e.preventDefault();
    if (!emailOrPhone) {
      setError('Please enter email or phone');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/auth/login', { emailOrPhone, password });
      setSuccessMsg(res.data.message); // Contains mock OTP info
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/auth/verify-otp', { emailOrPhone, otp: otpValue });
      login(res.data, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="login-graphic"
        >
          <div className="glass-card">
            <h2>Manage your products efficiently</h2>
            <p>Productr helps you organize, track, and scale your business effortlessly.</p>
          </div>
        </motion.div>
      </div>
      
      <div className="login-right">
        <div className="login-form-container">
          <div className="login-logo">
            <h2>Productr.</h2>
          </div>
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="login-header">
                  <h3>Login to your Productr Account</h3>
                  <p>Welcome back! Please enter your details.</p>
                </div>
                <form onSubmit={handleNext}>
                  <div className="form-group">
                    <label>Email or Phone number</label>
                    <div className="input-with-icon">
                      <Mail className="input-icon" size={18} />
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter email or phone"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button type="submit" className="btn-primary w-100 mt-4">
                    Continue <ArrowRight size={16} className="ml-2" />
                  </button>
                  <div className="login-footer">
                    <p>Don't have an account? <a href="#">Sign up Here</a></p>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="login-header">
                  <h3>Enter your Password</h3>
                  <p>For {emailOrPhone}</p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-with-icon">
                      <Lock className="input-icon" size={18} />
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="forgot-password">
                    <a href="#">Forgot Password?</a>
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button type="submit" className="btn-primary w-100 mt-4" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                  <button 
                    type="button" 
                    className="btn-outline w-100 mt-3" 
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="login-header text-center">
                  <CheckCircle2 size={48} className="success-icon mb-3" />
                  <h3>Enter OTP</h3>
                  <p>We've sent a 6-digit OTP to your {emailOrPhone.includes('@') ? 'email' : 'phone'}.</p>
                  {successMsg && <p className="text-success text-sm mt-2">{successMsg}</p>}
                </div>
                <form onSubmit={handleVerifyOtp}>
                  <div className="otp-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => otpRefs.current[index] = el}
                        type="text"
                        maxLength="1"
                        className={`otp-input ${error ? 'border-error' : ''}`}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      />
                    ))}
                  </div>
                  {error && <div className="error-message text-center">{error}</div>}
                  <button type="submit" className="btn-primary w-100 mt-4" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;
