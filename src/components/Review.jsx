import React from 'react';

function Review({creator, title, description, dueDate}) {
  return (
    <div className="flex gap-2 bg-red-400 text-sm border-l-2 border-black">
      <p>{creator}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{dueDate.toString()}</p>
    </div>
  );
}

export default Review;
