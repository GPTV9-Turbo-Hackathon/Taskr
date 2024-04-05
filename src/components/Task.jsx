import React from 'react';
import Review from './Review';

function Task({creator, title, description, dueDate}) {
  return (
    <div className='flex gap-2 bg-blue-400 text-sm border-r-2 border-black'>
      <p>{creator}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{dueDate.toString()}</p>
    </div>
  )
}

export default Task;
