import React from "react";
import Review from "./Review";
import mockReviewList from "./helpers/mockReviewList";

function ReviewList() {
  return (
    <div className="flex flex-col justify-between h-full">
      {mockReviewList.map((task, index) => (
        <Review
          key={index}
          creator={task.creator}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate.toString()}
        />
      ))}
    </div>
  );
}

export default ReviewList;
