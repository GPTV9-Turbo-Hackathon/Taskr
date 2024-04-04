import React from 'react';

function SideBar({ onSignoutClick }) {
  return (
    <div className="flex flex-col justify-between bg-slate-500 h-full">
      <p>Here should be a rounded avatar photo</p>
      <p>Last, First</p>
      <p>Here's should be unread notification button</p>
      <p>Here should be a button links to the rewards redeem page</p>
      <button
        onClick={onSignoutClick}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
