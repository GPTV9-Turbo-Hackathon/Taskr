import React from 'react';
import SideBar from './Sidebar';
import TaskList from './TaskList';

function UserMain({ onSignoutClick, tasks, reviews }) {
  // Sort to list the one with the nearest due date first
  tasks.sort((a,b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    return aDate - bDate;
  })

  return (
    <div className="grid grid-cols-5 h-full w-full">
      <div className="col-span-1">
        <SideBar onSignoutClick={onSignoutClick} />
      </div>

      <div className="col-span-4">
        <TaskList realTasks={tasks}/>
      </div>


    </div>
  );
}

export default UserMain;
