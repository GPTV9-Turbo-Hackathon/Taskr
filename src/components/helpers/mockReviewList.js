import { taskList } from './mockTaskList';

const mockReviewList = taskList;
mockReviewList.forEach((task) => task.moveToNextState());

export default mockReviewList;
