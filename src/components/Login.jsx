import { useState } from 'react';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LoginInputBox from './helpers/LoginInputBox';
import appLogo from '../assets/app-logo.png'

/*
  Link: https://tailwindui.com/components/application-ui/forms/sign-in-forms
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
function Login({ auth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const naviagte = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful.
    } catch (error) {
      console.error('Error signing in with email and password', error);
    }
  };

  const handleAnonymousLogin = async () => {
    console.log("anon login")
    try {
      await signInAnonymously(auth);
      // Anonymous login successful.
    } catch (error) {
      console.error('Error signing in anonymously', error);
    }
  };

  const handleCreateUserClick = () => {
    naviagte('/create-user');
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-w-">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-15 w-auto"
            src={appLogo}
            alt="Taskr"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <LoginInputBox
              htmlFor="email"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              text="Email address"
            />
            <LoginInputBox
              htmlFor="password"
              id="passowrd"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              text="Enter your password"
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <button
              onClick={handleAnonymousLogin}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Anonymous login
            </button>{' '}
            Or{' '}
            <button
              onClick={handleCreateUserClick}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
