import React, { useState } from 'react';
import '../firebase-config';
import { db } from '../firebase-config';
import { ref, set } from 'firebase/database';
import sampleTask from './helpers/mockTaskList';

import LoginInputBox from './helpers/LoginInputBox';
import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';

function CreateUser({ auth }) {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  // TODO: Add avatar upload
  // const [avatarLink, setAvatarLink] = useState('');

  const navigate = useNavigate();

  const createUserInDatabase = async (user, firstName, middleName, lastName) => {
    try {
      await set(ref(db, `users/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        avatar: '',
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        points: 0,
        eligibleForReview: false,
        // TODO: Create initial value for every user
        // reviews: { 1: '1' },
        tasks: sampleTask.map((task, index) => {
          return { 
            id: index,
            creatorID: task.creatorID,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate.toString(),
            status: task.status,
          };
        }),
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
      createUserInDatabase(user, firstName, middleName, lastName);
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
              htmlFor="firstName"
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              text="Enter first name"
            />
            <LoginInputBox
              htmlFor="middleName"
              id="middleName"
              name="middleName"
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              text="Enter middle name"
            />
            <LoginInputBox
              htmlFor="lastName"
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              text="Enter last name"
            />
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
