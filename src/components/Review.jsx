import React, { useState } from 'react';

function Review({ review, updateReviewStatus }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [grade, setGrade] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [isApproving, setIsApproving] = useState(true); // true for approve, false for reject

  const calculateTimeBeforeDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const difference = deadlineDate.getTime() - now.getTime();
    const daysBeforeDeadline = Math.floor(difference / (1000 * 3600 * 24));
    return daysBeforeDeadline >= 0 ? `${daysBeforeDeadline} days early` : 'Past deadline';
  };

  const handleApproveClick = () => {
    setIsApproving(true);
    setShowGradeModal(true);
  };

  const handleRejectClick = () => {
    setIsApproving(false);
    setShowGradeModal(true);
  };

  const handleGradeSubmit = () => {
    setShowGradeModal(false);
    setShowConfirmModal(true);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleReviewMessageChange = (e) => {
    setReviewMessage(e.target.value);
  };

  const handleFinalSubmit = () => {
    updateReviewStatus(review.id, isApproving ? 'Approved' : 'Rejected');
    // Here, you would also send `grade` and `reviewMessage` to your backend or state management
    setShowConfirmModal(false);
    setGrade('');
    setReviewMessage('');
  };

  return (
    <div className="bg-white shadow rounded-md mb-4 p-4">
      <div className="grid grid-cols-4 gap-4 items-center">
        <div className="col-span-3">
          {/* Check that review exists before trying to access its properties */}
          <h3 className="text-lg font-medium text-gray-900">{review?.name}</h3>
          <p className="text-gray-600">{review?.description}</p>
        </div>
        <div className="flex space-x-2 justify-end">
          <button onClick={() => setShowDetails(!showDetails)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {showDetails ? 'Hide' : 'Details'}
          </button>
          <button onClick={handleApproveClick} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Approve
          </button>
          <button onClick={handleRejectClick} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Reject
          </button>
        </div>
      </div>
      {showDetails && review && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-500">Task Difficulty: {review.difficulty}</p>
          <p className="text-sm text-gray-500">Assigned to: {review.assignee?.name} (Employee ID: {review.assignee?.id})</p>
          {/* Additional details here */}
        </div>
      )}
      {/* Grade and Review Message Modal */}
      {showGradeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-5 border w-96 shadow-lg rounded-md">
              <div className="space-y-4">
                {isApproving && (
                  <select
                    value={grade}
                    onChange={handleGradeChange}
                    className="block w-full p-2 border rounded"
                  >
                    <option value="">Select Grade</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                )}
                <textarea
                  placeholder="Type your review message (optional)"
                  value={reviewMessage}
                  onChange={handleReviewMessageChange}
                  className="block w-full p-2 border rounded"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setShowGradeModal(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
                <button
                  onClick={handleGradeSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-30">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-5 border w-96 shadow-lg rounded-md">
              <p className="text-gray-900 text-lg">Are you sure you want to submit?</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  No
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
