import React, { useState } from 'react';
import Task from './Task';

function TaskList() {
  const [tasks, setTasks] = useState([
    // Initial tasks data with "In Progress" status
    { id: 1, name: 'Setup meeting with currency', deadline: '12 Dec 2020', status: 'In Progress', time: '00:45:14', assignee: 'Avatar1', teammates: 'Team A', difficulty: 'Medium', description: 'Meeting regarding Q4 budget.' },
    { id: 2, name: 'Quarterly Marketing Review', deadline: '15 Dec 2020', status: 'In Progress', time: '01:30:00', assignee: 'Avatar2', teammates: 'Team B', difficulty: 'High', description: 'Review of marketing strategy.' },
  ]);

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task);
    setTasks(updatedTasks);
  };
  /* <div className="flex flex-col justify-between h-full">
      {sampleTask.map((task, index) => (
        <Task
          key={index}
          creator={task.creator}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate.toString()}
        />
      ))}*/

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Marketing Tasks</h1>
        <Task tasks={tasks} updateTaskStatus={updateTaskStatus} />
      </div>
    </div>
  );
}

export default TaskList;
