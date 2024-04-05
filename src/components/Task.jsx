import React from 'react';

function Task({creator, title, description, dueDate}) {
  return (
    <div className='flex gap-2 bg-red-900 text-sm'>
      <p>{creator}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{dueDate.toString()}</p>
    </div>
  )
}

export default Task;
