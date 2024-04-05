import Task from './TaskClass';
export const taskList = [
  new Task('Alice', 'Task 1', 'Description 1', new Date('2024-07-01')),
  new Task('Alic', 'Task 2', 'Description 2', new Date('2025-07-01')),
  new Task('Ali', 'Task 3', 'Description 3', new Date('2026-07-01')),
  new Task('Al', 'Task 4', 'Description 4', new Date('2027-07-01')),
  new Task('A', 'Task 5', 'Description 5', new Date('2028-07-01')),
];

export const sampleTask = [
  new Task('System', 'Get used to the app', 'This is a sample task to help you get used to the app', new Date()),
  new Task('System', 'Get used to the app agin', 'This is a sample task to help you get used to the app again', new Date()),
  new Task(
    'System',
    'Get used to the app one last time',
    'This is a sample task to help you get used to the app one last time',
    new Date(),
  ),
];

export default taskList;
