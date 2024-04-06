import React from "react";
import TaskList from "./TaskList";

function SubmittedTasks({ tasks, uid }) {
  const submittedTasks = tasks.filter((task) => task.status === "Submitted, pending review");
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Submitted Tasks</h1>
        <TaskList tasks={submittedTasks} uid={uid} />
      </div>
    </div>
  );
}

export default SubmittedTasks;
