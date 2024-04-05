import { useState } from 'react';
import { database } from '../path/to/your/firebase/config'; // Adjust the path as necessary
import { ref, push } from 'firebase/database';

function AddTask() {
  const [task, setTask] = useState('');

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task !== '') {
      const tasksRef = ref(database, 'tasks');
      push(tasksRef, {
        taskName: task,
        completed: false,
      }).then(() => {
        setTask('');
        alert('Task added successfully!');
      }).catch((error) => {
        alert('Failed to add task: ' + error.message);
      });
    } else {
      alert('Please enter a task.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add new task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
