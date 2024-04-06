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

function Review({ dueDate, status, title }) {
  return (
    <div className="bg-white shadow rounded-md mb-4">
      <div className="grid grid-cols-4 px-6 py-4 border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => {}}
          className="col-span-1 text-sm font-medium text-red-600 hover:text-blue-800 transition ease-in-out duration-150"
        >
          {title}
        </button>
        <div className="text-sm text-gray-600">{dueDate}</div>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
    </div>
  );
}

export default Review;
