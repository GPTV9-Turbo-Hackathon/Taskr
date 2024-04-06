import React from 'react';
import { useNavigate } from 'react-router-dom';

function SideBar({ onSignoutClick }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between bg-slate-500 h-full p-5">
      <img
        src="src/assets/placeholder-pfp.png"
        alt="Your Profile Picture"
        className="rounded-full object-contain mb-5"
      />
      <p className="text-white text-5xl mb-5 underline underline-offset-auto">G'day mate</p>

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1"
        onClick={() => navigate('/addtask')}
      >
        Add Tasks
      </button>

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1"
        onClick={() => navigate('/tasks')}
      >
        Tasks
      </button>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1"
        onClick={() => navigate('/reviews')}
      >
        Reviews
      </button>

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1"
        onClick={() => navigate('/rewards')}
      >
        Claim Rewards
      </button>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1"
        onClick={() => navigate('/submitted')}
      >
        Submitted Tasks
      </button>
      <button
        onClick={onSignoutClick}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1"
      >
        Sign Out
      </button>
    </div>
  );
}

export default SideBar;
