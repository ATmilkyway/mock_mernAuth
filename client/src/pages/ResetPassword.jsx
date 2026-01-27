import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { backendURL, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData } =
    useContext(AppContext);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPasword, setNewPassword] = useState('');
  const [isOtpEmailSent, setOtpEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setOtpSubmmited] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e, index) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendURL + '/send-reset-otp', { email });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setOtpEmailSent(true);
    } catch (error) {
      toast.error(data.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        className="absolute top-5 left-5 w-28 cursor-pointer sm:left-20 sm:w-32"
        onClick={() => navigate('/')}
      />

      {!isOtpEmailSent && (
        <form
          className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg"
          onSubmit={handleKeyDown}
        >
          <h1 className="mb-4 text-center text-2xl font-semibold text-white">Reset Password</h1>
          <p className="mb-6 text-center text-indigo-300">Enter your registered email.</p>
          <div className="mb-4 flex w-full items-center gap-3 rounded-full bg-[#333A5C] px-5 py-2.5">
            <img src={assets.mail_icon} className="h-3 w-3" />
            <input
              type="email"
              placeholder="Email ID"
              className="bg-transparent text-white outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="w-full cursor-pointer rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 py-2.5 text-white">
            Submit
          </button>
        </form>
      )}

      {/* otp input form */}
      {!isOtpSubmitted && isOtpEmailSent && (
        <form className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg" onSubmit={() => {}}>
          <h1 className="mb-4 text-center text-2xl font-semibold text-white">Reset Password OTP</h1>
          <p className="mb-6 text-center text-indigo-300">
            Enter the 6 digit code sent to your email.
          </p>
          <div className="mb-8 flex justify-between" onPaste={() => {}}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength={1}
                  key={index}
                  required
                  className="h-12 w-12 rounded-md bg-[#333A5C] text-center text-xl text-white"
                  autoComplete="false"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full cursor-pointer rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 py-2.5 text-white">
            Submit
          </button>
        </form>
      )}

      {isOtpSubmitted && isOtpEmailSent && (
        <form className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg">
          <h1 className="mb-4 text-center text-2xl font-semibold text-white">New Password</h1>
          <p className="mb-6 text-center text-indigo-300">Enter the new password below.</p>
          <div className="mb-4 flex w-full items-center gap-3 rounded-full bg-[#333A5C] px-5 py-2.5">
            <img src={assets.lock_icon} className="h-3 w-3" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-white outline-none"
              required
              value={newPasword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button className="w-full cursor-pointer rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 py-2.5 text-white">
            Submit
          </button>
        </form>
      )}
      {/* Enter new password */}
    </div>
  );
};

export default ResetPassword;
