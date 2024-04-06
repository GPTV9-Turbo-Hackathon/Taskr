import { useState } from 'react';
import { db as database } from '../firebase-config'; // Adjust the path as necessary
import { ref, push } from 'firebase/database';
import { getFunctions, httpsCallable } from 'firebase/functions';
import './AddTask.css';
import SideBar from './Sidebar';


function AddTask() {
  const [task, setTask] = useState('');
  const [prelimtasklist, setPrelimtasklist] = useState([]);

    /* tasklist prototype
   {
      "task": "Finalize Quarterly Report",
      "description": "Analyze data trends and draft a summary for the department's quarterly report.",
      "due_date": "Wednesday",
      "assigned_to": "Alex",
      "priority": "High"
    },
    */
  

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
  
    const processAiResponse = (response) => {
    if (!response) {
        console.error('No response received');
        return;
    }
    let tasksJson;
    try {
        const cleanResponse = response.replace(/json\n?|/g, '').trim();
        tasksJson = JSON.parse(cleanResponse);
        console.log("taskjson is:", tasksJson);
        setPrelimtasklist([ ...tasksJson]);
    } catch (error) {
        console.error('Failed to parse response as JSON:', error);
        return;
    }
    // Assuming tasksJson is an array of tasks
    /*tasksJson.forEach(task => {
        const tasksRef = ref(database, 'tasks');
        push(tasksRef, {
        taskName: task.name || 'Unnamed task',
        completed: task.completed || false,
        }).then(() => {
        console.log(`Task added: ${task.name}`);
        }).catch((error) => {
        console.error('Failed to add task:', error);
        });
    });*/
    
    alert('Transcript analysed successfully. Check console for tasks.');
    };

    const handleAnalyse = (e) => {
    e.preventDefault();
    console.log('Analyzing transcript...');
    const transcript = e.target[0].value; 
    if (!transcript.trim()) {
        alert('Please paste a transcript to analyse.');
        return;
    }
    const functions = getFunctions();
    const makeTasklistFromTranscript = httpsCallable(functions, 'MakeTasklistFromTranscript');
  
    makeTasklistFromTranscript({ transcript })
      .then((result) => {
        // Assuming the result contains a list of tasks in JSON format
        console.log(result.data.response[0].text.value);
        processAiResponse(result.data.response[0].text.value);
      })
      .catch((error) => {
        console.error('Error analysing transcript:', error);
        alert('Failed to analyse transcript. Please try again.');
      });
    };

    function acceptTask(index) {
      console.log('Accepting task:', index)
      const tasksRef = ref(database, 'tasks');
      // Implement logic to mark the task as completed
      push(tasksRef, {
        taskName: prelimtasklist[index].task,
        description: prelimtasklist[index].description,
        due_date: prelimtasklist[index].due_date,
        assigned_to: prelimtasklist[index].assigned_to,
        priority: prelimtasklist[index].priority,
        completed: prelimtasklist[index].completed ? "true" : "false",
      }).then(() => {
        alert('Task added successfully!');
        const updatedTasks = prelimtasklist.filter((task, taskIndex) => taskIndex !== index);
        setPrelimtasklist(updatedTasks);
      }).catch((error) => {
        alert('Failed to add task: ' + error.message);
      });
    }

    function declineTask(index) {
        console.log('Declining task at index:', index);
        const updatedTasks = prelimtasklist.filter((task, taskIndex) => taskIndex !== index);
        setPrelimtasklist(updatedTasks);
      }

    function handleTaskChange(e, index, property) {
    const updatedTasks = [...prelimtasklist];
    updatedTasks[index][property] = e.target.value;
    setPrelimtasklist(updatedTasks);
    }

    function renderTaskList(tasks) {
        return tasks.map((task, index) => (
          <div className='TaskContainer' key={index}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='TaskContainerTopBar'>
              <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{task.task}</span>
              <span style={{fontWeight: 'bold', textDecoration: 'underline'}}> - </span>
              <span style={{fontWeight: 'bold', textDecoration: 'underline'}}>{task.completed ? 'Completed' : 'Pending'}</span>
            </div>
            <div>
              <button onClick={() => acceptTask(index)} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>✓</button>
              <button onClick={() => declineTask(index)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>✕</button>
            </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px', alignItems: 'center', width: '30vw' }} className='editableproperties'>
                <label htmlFor="taskName">Task:</label>
                <input className='TaskContainerInputs' type="text" id="taskName" value={task.task} onChange={(e) => handleTaskChange(e, index, 'task')} />
                
                <label htmlFor="description">Description:</label>
                <input className='TaskContainerInputs' type="text" id="description" value={task.description} onChange={(e) => handleTaskChange(e, index, 'description')} />
                
                <label htmlFor="dueDate">Date:</label>
                <input className='TaskContainerInputs' type="date" id="dueDate" value={task.due_date} onChange={(e) => handleTaskChange(e, index, 'due_date')} />
                
                <label htmlFor="assignedTo">Assigned to:</label>
                <input className='TaskContainerInputs' type="text" id="assignedTo" value={task.assigned_to} onChange={(e) => handleTaskChange(e, index, 'assigned_to')} />
                
                <label htmlFor="priority">Priority:</label>
                <select className='TaskContainerInputs' id="priority" value={task.priority} onChange={(e) => handleTaskChange(e, index, 'priority')}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
          </div>
        ));
      }

      function createTaskManually() {
      setPrelimtasklist([...prelimtasklist, {
        task: "default task",
        description: null,
        due_date: null,
        assigned_to: null,
        priority: null,
        completed: null,
      }]);
      }

  return (
    <div className="grid grid-cols-5 h-full w-full">
        <div className="col-span-1">
            <SideBar />
        </div>
        <div className="col-span-4" style={{ display: 'grid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px', overflowY: 'auto' }}>
        <h1 style={{fontWeight: 'bold', fontSize: '32px'}}>Add Tasks</h1>
             <div className="shadow-xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', width: '60vw' }}>
                
                <h3 style={{fontWeight: 'bold', fontSize: '20px'}}>Use Transcript</h3>
                <button className='mainbutton'>Import from Zoom</button>
                <button className='mainbutton'>Import from Google Meets</button>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
                    onSubmit={handleAnalyse} // Added call to handleAnalyse on form submit
                >
                    <textarea
                    placeholder="Paste your transcript here..."
                    style={{ width: '300px', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button type="submit" className='mainbutton'>Analyse</button>
                </form>
            </div>
        <div>
            {prelimtasklist && Object.keys(prelimtasklist).length > 0 && (
            <div>
                {renderTaskList(prelimtasklist)}
            </div>
            )}
        </div>
            <button style={{backgroundColor: "darkgrey"}} className='mainbutton AddManualTaskButton' onClick={createTaskManually}>Add Task Manually</button>
        </div>
    </div>
  );
}

export default AddTask;
