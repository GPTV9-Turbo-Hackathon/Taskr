import React from 'react';

function SideBar({ onSignoutClick }) {
  return (
    <div className="flex flex-col justify-between bg-slate-500 h-full p-5">
      <img src="src/assets/placeholder-pfp.png" alt="Your Profile Picture" className="rounded-full object-contain mb-5"/>
      <p className="text-white text-5xl mb-5">First Last</p>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1">View Notifications</button>
      <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 border border-gray-400 rounded-full shadow my-1">Claim Rewards</button>
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
