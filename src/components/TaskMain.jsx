import React from 'react';
import SideBar from './Sidebar';
import TaskList from './TaskList';

function TaskMain({ onSignoutClick, tasks, uid }) {
  // Sort to list the one with the nearest due date first
  console.log('TaskMain tasks', uid);

  const unfinishedTasks = tasks.filter((task) => task.status !== 'Submitted, pending review');
  unfinishedTasks.sort((a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    return aDate - bDate;
  });

  return (
    <div className="grid grid-cols-5 h-full w-full">
      <div className="col-span-1">
        <SideBar onSignoutClick={onSignoutClick} />
      </div>

      <div className="col-span-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Marketing Tasks</h1>
        <TaskList tasks={unfinishedTasks} uid={uid} />
      </div>
    </div>
  );
}

export default TaskMain;
