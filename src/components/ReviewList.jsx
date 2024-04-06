
import React from 'react';
import Review from './Review';
import mockReviewList from './helpers/mockReviewList';


function ReviewList() {
  // Initial tasks data with "Awaiting Review" status
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Currency Meeting Setup', deadline: '12 Dec 2020', status: 'Awaiting Review', description: 'Discuss Q4 budget allocations.' },
    { id: 2, name: 'Marketing Strategy Review', deadline: '15 Dec 2020', status: 'Awaiting Review', description: 'Evaluate Q3 marketing performance.' },
    // ... other reviews
  ]);

  // Function to update a review's status
  const updateReviewStatus = (reviewId, newStatus) => {
    const updatedReviews = reviews.map((review) =>
      review.id === reviewId ? { ...review, status: newStatus } : review
    );
    setReviews(updatedReviews);
  };

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
