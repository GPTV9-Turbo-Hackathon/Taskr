const TaskStatus = {
  Doing: 'Doing',
  Reviewing: 'Reviewing',
  Done: 'Done',
};
export default class Task {
  constructor(creator, title, description, dueDate) {
    this._creator = creator;
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._status = TaskStatus.Doing;
    this._collaborators = [];
    this._subTasks = [];
  }
  get creator() {
    return this._creator;
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get dueDate() {
    return this._dueDate;
  }
  get status() {
    return this._status;
  }
  get collaborators() {
    return this._collaborators;
  }
  get subTasks() {
    return this._subTasks;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  addCollaborator(collaborator) {
    this._collaborators.push(collaborator);
  }

  moveToNextState() {
    if (this._status === TaskStatus.Doing) {
      this._status = TaskStatus.Reviewing;
    } else if (this._status === TaskStatus.Reviewing) {
      this._status = TaskStatus.Done;
    }
  }

  addSubTask(subTask) {
    this._subTasks.push(subTask);
  }
}
