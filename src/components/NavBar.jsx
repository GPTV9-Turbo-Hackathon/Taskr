import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, onClick }) {
  return (
    <div>
      <ul className="flex list-none space-x-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {isLoggedIn && (
          <li>
            <button onClick={onClick}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
