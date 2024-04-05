const TaskStatus = {
  Doing: 'In Progress',
  Reviewing: 'Submitted For Review',
  Wait: 'On Hold',
  Done: 'Finished'
};
export default class Task {
  constructor(creatorID, title, description, dueDate) {
    this.creatorID = creatorID
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = TaskStatus.Doing;
    this.collaborators = [];
    this.subTasks = [];
  }
}
