import { useState } from 'react';
import { db as database } from '../firebase-config'; // Adjust the path as necessary
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

  const handleAnalyse = (e) => {
    const transcript = e.target.value;
    console.log('Analyzing transcript...');
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
      <h2>Analyse via Transcript</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
        onSubmit={handleAnalyse} // Added call to handleAnalyse on form submit
      >
        <textarea
          placeholder="Paste your transcript here..."
          style={{ width: '300px', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Analyse</button>
      </form>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add new task"
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
