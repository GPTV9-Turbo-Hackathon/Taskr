import React from 'react';

function LoginInputBox({ htmlFor, id, name, type, value, onChange, text }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-left block text-sm font-medium leading-6 text-gray-900">
        {text}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete="email"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default LoginInputBox;
