import axios from 'axios';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { backendURL, userData, isLoggedIn, getUserData } = useContext(AppContext);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(backendURL + '/api/auth/verify-account', { otp });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        className="absolute top-5 left-5 w-28 cursor-pointer sm:left-20 sm:w-32"
        onClick={() => navigate('/')}
      />
      <form
        className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg"
        onSubmit={onSubmitHandler}
      >
        <h1 className="mb-4 text-center text-2xl font-semibold text-white">Email Verify OTP</h1>
        <p className="mb-6 text-center text-indigo-300">
          Enter the 6 digit code sent to your email.
        </p>
        <div className="mb-8 flex justify-between" onPaste={handlePaste}>
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
        <button className="w-full cursor-pointer rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 py-3 text-white">
          Verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
