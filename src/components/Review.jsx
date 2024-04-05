import React from 'react';

function Review({ dueDate, status, title }) {
  return (
    <div className="bg-white shadow rounded-md mb-4">
      <div className="grid grid-cols-4 px-6 py-4 border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => {}}
          className="col-span-1 text-sm font-medium text-red-600 hover:text-blue-800 transition ease-in-out duration-150"
        >
          {title}
        </button>
        <div className="text-sm text-gray-600">{dueDate}</div>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
    </div>
  );
}

export default Review;
