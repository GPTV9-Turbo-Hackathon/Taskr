// import React, {useState} from 'react';
import React, { useState } from 'react';
import Task from './Task';
import { useEffect } from 'react';

function TaskList({ realTasks }) {

  const tasks = realTasks || [];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Marketing Tasks</h1>
        {tasks.map((task, index) => (
          <Task key={task.id || index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
