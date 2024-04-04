import React from 'react';
import SideBar from './Sidebar';
import TaskList from './TaskList';
import ReviewList from './ReviewList';

function UserMain() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <SideBar />
      </div>

      <div className="col-span-2">
        <TaskList />
      </div>

      <div className="col-span-2">
        <ReviewList />
      </div>
    </div>
  );
}

export default UserMain;
