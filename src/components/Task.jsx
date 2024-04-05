import React, { useState } from 'react';
function Task() {
  // Example tasks array with unique data for each task
  const tasks = [
    { id: 1, name: 'Setup meeting with currency', deadline: '12 Dec 2020', status: 'Active', time: '00:45:14', assignee: 'Avatar1', teammates: 'Team A', difficulty: 'Medium', description: 'Meeting regarding Q4 budget.' },
    { id: 2, name: 'Quarterly Marketing Review', deadline: '15 Dec 2020', status: 'Pending', time: '01:30:00', assignee: 'Avatar2', teammates: 'Team B', difficulty: 'High', description: 'Review of marketing strategy.' },
    // ... Add more tasks with unique data
  ];

  const [selectedTask, setSelectedTask] = useState(null);

  const openTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };


  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Marketing</h1>

        {/* Task List Header */}
        <div className="bg-white shadow rounded-md mb-4">
          <div className="grid grid-cols-4 px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <span>Task Name</span>
            <span>Due Date</span>
            <span>Status</span>
            <span>Assigner</span>
          </div>

          {/* Task List Items */}
          {tasks.map((task) => (
            <div key={task.id} className="grid grid-cols-4 px-6 py-4 border-b border-gray-200 last:border-b-0">
              {/* Task Name */}
              <div className="text-sm font-medium text-gray-900">
                <button
                  onClick={() => openTaskDetails(task)}
                  className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-150"
                >
                  {task.name}
                </button>
              </div>
              {/* Due Date */}
              <div className="text-sm text-gray-600">
                {task.deadline}
              </div>
              {/* Status */}
              <div className="text-sm text-gray-600">
                {task.status}
              </div>
              {/* Assignee Picture */}
              <div className="text-sm text-gray-600">
                <img className="h-8 w-8 rounded-full object-cover" src={`/path/to/${task.assignee}.jpg`} alt="Assignee" />
              </div>
            </div>
          ))}
        </div>

        {/* Task Details Modal */}
        {selectedTask && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
            <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-medium text-gray-900 text-center">{selectedTask.name}</h3>
              <div className="mt-2 space-y-3">
                <p className="text-sm text-gray-600">Assigner: {selectedTask.assignee}</p>
                <p className="text-sm text-gray-600">Teammates: {selectedTask.teammates}</p>
                <p className="text-sm text-gray-600">Difficulty: {selectedTask.difficulty}</p>
                <p className="text-sm text-gray-600">Due date: {selectedTask.deadline}</p>
                <p className="text-sm text-gray-600">Description: {selectedTask.description}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeTaskDetails}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;

