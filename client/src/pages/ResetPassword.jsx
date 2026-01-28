import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

const ResetPassword = () => {
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setOtpEmailSent] = useState(false);
  const [isOtpSubmitted, setOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').slice(0, 6);
    paste.split('').forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendURL}/api/auth/send-reset-otp`, { email });

      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setOtpEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();

    const otpValue = inputRefs.current.map((input) => input?.value || '').join('');

    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setOtp(otpValue);
    setOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendURL}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });

      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        className="absolute top-5 left-5 w-28 cursor-pointer sm:left-20 sm:w-32"
        onClick={() => navigate('/')}
      />

      {!isOtpSent && (
        <form
          className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg"
          onSubmit={onSubmitEmail}
        >
          <h1 className="mb-4 text-center text-2xl font-semibold text-white">Reset Password</h1>
          <p className="mb-6 text-center text-indigo-300">Enter your registered email.</p>

          <div className="mb-4 flex items-center gap-3 rounded-full bg-[#333A5C] px-5 py-2.5">
            <img src={assets.mail_icon} className="h-3 w-3" />
            <input
              type="email"
              placeholder="Email ID"
              className="w-full bg-transparent text-white outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="w-full rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 py-2.5 text-white">
            Submit
          </button>
        </form>
      )}

      {/* STEP 2 — OTP */}
      {!isOtpSubmitted && isOtpSent && (
        <form className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg" onSubmit={onSubmitOtp}>
          <h1 className="mb-4 text-center text-2xl font-semibold text-white">OTP Verification</h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter the 6-digit code sent to your email.
          </p>

          <div className="mb-8 flex justify-between" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                required
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                className="h-12 w-12 rounded-md bg-[#333A5C] text-center text-xl text-white"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button className="w-full rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 py-2.5 text-white">
            Verify OTP
          </button>
        </form>
      )}

      {/* STEP 3 — NEW PASSWORD */}
      {isOtpSubmitted && isOtpSent && (
        <form
          className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg"
          onSubmit={onSubmitNewPassword}
        >
          <h1 className="mb-4 text-center text-2xl font-semibold text-white">New Password</h1>
          <p className="mb-6 text-center text-indigo-300">Enter your new password.</p>

          <div className="mb-4 flex items-center gap-3 rounded-full bg-[#333A5C] px-5 py-2.5">
            <img src={assets.lock_icon} className="h-3 w-3" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-transparent text-white outline-none"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button className="w-full rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 py-2.5 text-white">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
