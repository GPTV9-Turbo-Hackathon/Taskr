import React from 'react';
import Task from './Task';
import sampleTask from './helpers/mockTaskList';

function TaskList( {tasks} ) {
  return (
<<<<<<< HEAD
    <div>
      {sampleTask.map((task, index) => (
        <Task
          key={index}
          creator={task.creator}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate.toString()}
        />
      ))}
=======
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-auto">
        {tasks.map((task, index) => (
          <Task key={task.id || index} task={task} uid={uid} />
        ))}
      </div>
>>>>>>> 91337d2 (replace app logo and some change in login&create)
    </div>
  );
}

export default TaskList;
