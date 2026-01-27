import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useState } from 'react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        className="absolute top-5 left-5 w-28 cursor-pointer sm:left-20 sm:w-32"
        onClick={() => navigate('/')}
      />
      <form className="w-96 rounded-lg bg-slate-900 p-8 text-sm shadow-lg">
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
    </div>
  );
};

export default ResetPassword;
