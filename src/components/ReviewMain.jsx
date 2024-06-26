import React from 'react';
import SideBar from './Sidebar';
import ReviewList from './ReviewList';

function ReviewMain({ onSignoutClick, tasks }) {
  return (
    <div className="grid grid-cols-5 h-full w-full">
      <div className="col-span-1">
        <SideBar onSignoutClick={onSignoutClick} />
      </div>

      <div className="col-span-4">
        <ReviewList realTasks={tasks} />
      </div>
    </div>
  );
}

export default ReviewMain;
