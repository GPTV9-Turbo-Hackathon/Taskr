// import React, {useState} from 'react';
import React from 'react';
import Task from './Task';

function TaskList({ tasks, uid }) {

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-auto">
        {tasks.map((task, index) => (
          <Task key={task.id || index} task={task} uid={uid} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
