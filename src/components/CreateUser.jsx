import React, { useState } from 'react';
import '../firebase-config';
import { db } from '../firebase-config';
import { ref, set } from 'firebase/database';

import LoginInputBox from './helpers/LoginInputBox';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';

function CreateUser({ auth }) {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  const navigate = useNavigate();

  const createUserInDatabase = async (user) => {
    try {
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        uid: user.uid,
      });
    } catch (error) {
      console.error('Error creating user in database', error);
    }
  };
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, passwordOne);
      const user = userCredential.user;
      createUserInDatabase(user);
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-w-">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleCreateUser}>
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
              htmlFor="passwordOne"
              id="passowrdOne"
              name="passwordOne"
              type="password"
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              text="Enter your password"
            />
            <LoginInputBox
              htmlFor="passwordTwo"
              id="passowrdTwo"
              name="passwordTwo"
              type="password"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              text="Enter your password again"
            />

            {passwordOne === passwordTwo ? (
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <p className="text-red-400">Passwords doesn't match!</p>
            )}
          </form>
          <p>Or</p>
          <button
            onClick={() => navigate(-1)}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Go back
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
