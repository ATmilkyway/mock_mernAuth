import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const { backendURL, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData } =
    useContext(AppContext);
  const [state, setState] = useState('Sign up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // onSubmitHandleer
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const endpoint = state === 'Sign up' ? '/api/auth/register' : '/api/auth/login';
      const payload = state === 'Sign up' ? { name, email, password } : { email, password };

      const { data } = await axios.post(backendURL + endpoint, payload);

      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-200 to-purple-400 px-6 sm:px-0">
      <img
        src={assets.logo}
        className="absolute top-5 left-5 w-28 cursor-pointer sm:left-20 sm:w-32"
        onClick={() => navigate('/')}
      />
      <div className="w-full rounded-lg bg-slate-900 p-10 text-sm text-indigo-300 shadow-lg sm:w-96">
        <h2 className="mb-3 text-center text-3xl font-semibold text-white">
          {state === 'Sign up' ? 'Create account' : 'Login'}
        </h2>
        <p className="mb-6 text-center text-sm">
          {state === 'Sign up' ? 'Create your account' : 'Login to your account'}
        </p>
        <form onSubmit={onSubmitHandler}>
          {/* name */}
          {state === 'Sign up' && (
            <div className="mb-4 flex w-full items-center gap-3 rounded-full bg-[#333A53] px-5 py-2.5">
              <img src={assets.person_icon} />
              <input
                type="text"
                placeholder="Full Name"
                required
                autoComplete="false"
                className="bg-transparent outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          {/* email */}

          <div className="mb-4 flex w-full items-center gap-3 rounded-full bg-[#333A53] px-5 py-2.5">
            <img src={assets.mail_icon} />
            <input
              type="email"
              placeholder="Email"
              required
              autoComplete="false"
              className="bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 flex w-full items-center gap-3 rounded-full bg-[#333A53] px-5 py-2.5">
            <img src={assets.lock_icon} />
            <input
              type="password"
              placeholder="Password"
              required
              autoComplete="false"
              className="bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p
            className="mb-4 cursor-pointer text-indigo-500"
            onClick={() => navigate('/reset-password')}
          >
            Forgot password?
          </p>
          <button className="w-full cursor-pointer rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 py-2.5 font-medium">
            {state}
          </button>
        </form>
        {state === 'Sign up' ? (
          <p className="mt-4 text-center text-xs text-gray-400">
            Already have an account?{' '}
            <span
              className="cursor-pointer text-blue-400 underline"
              onClick={() => setState('Login')}
            >
              Login here.
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-xs text-gray-400">
            Don't have an account?{' '}
            <span
              className="cursor-pointer text-blue-400 underline"
              onClick={() => setState('Sign up')}
            >
              Sign up.
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
