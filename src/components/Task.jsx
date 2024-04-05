import React, { useState } from 'react';

function Task({ task }) {
  const { dueDate, title } = task;

  const [status, setStatus] = useState(task.status);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const updateTaskStatus = (newStatus) => {
    setStatus((prev) => {
      return newStatus;
    });
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setShowConfirmModal(false);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
    setShowConfirmModal(false);
  };

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    if (selectedTask) {
      updateTaskStatus('Submitted, pending review');
      setShowConfirmModal(false);
      setSelectedTask(null);
    }
  };

  const setOnHold = () => {
    if (selectedTask) {
      updateTaskStatus('On Hold');
      setSelectedTask(null);
    }
  };

  let listContainerAttributes = '';
  if (status === 'On Hold') {
    listContainerAttributes = 'bg-yellow-100 shadow rounded-md mb-4';
  } else if (status === 'Submitted, pending review') {
    listContainerAttributes = 'bg-slate-300 shadow rounded-md mb-4';
  } else {
    listContainerAttributes = 'bg-white shadow rounded-md mb-4';
  }

  return (
    <>
      {/* Where the list showd */}
      <div className={listContainerAttributes}>
        <div className="grid grid-cols-4 px-6 py-4 border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => openTaskDetails(task)}
            className="col-span-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition ease-in-out duration-150"
          >
            {title}
          </button>
          <div className="text-sm text-gray-600">{dueDate}</div>
          <div className="text-sm text-gray-600">{status}</div>
        </div>
      </div>
      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
          <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 text-center">{selectedTask.name}</h3>
            <div className="mt-2 space-y-3">
              <p className="text-sm text-gray-600">Assignee: {selectedTask.assignee || ''}</p>
              <p className="text-sm text-gray-600">Teammates: {selectedTask.teammates || ''}</p>
              <p className="text-sm text-gray-600">Difficulty: {selectedTask.difficulty || ''}</p>
              <p className="text-sm text-gray-600">Due date: {selectedTask.deadline || ''}</p>
              <p className="text-sm text-gray-600">Description: {selectedTask.description || ''}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={closeTaskDetails}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
              <button
                onClick={openConfirmModal}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
              <button
                onClick={setOnHold}
                className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                On Hold
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-5 border w-96 shadow-lg rounded-md">
              <p className="text-gray-900 text-lg">Are you sure you want to submit?</p>
              <div className="mt-4 flex justify-center space-x-3">
                <button
                  onClick={handleConfirmSubmit}
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Task;
