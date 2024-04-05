import React from 'react';
import Task from './Task';
import sampleTask from './helpers/mockTaskList';

function TaskList( {tasks} ) {
  return (
        <div className="flex flex-col justify-between h-full">
      {sampleTask.map((task, index) => (
        <Task
          key={index}
          creator={task.creator}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate.toString()}
        />
      ))}
    </div>
  );
}

export default TaskList;
