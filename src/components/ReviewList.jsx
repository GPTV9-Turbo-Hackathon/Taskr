import React from 'react';
import Review from './Review';
import mockReviewList from './helpers/mockReviewList';

function ReviewList() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Reviews</h1>
        {mockReviewList.map((task, index) => (
          <Review key={index} title={task.title} description={task.description} dueDate={task.dueDate.toString()} />
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
