class Mission {
  constructor(tasks) {
    this._tasks = tasks;
  }

  addTask(task) {
    this._tasks.push(task);
  }

  clear() {
    this._tasks = [];
  }

  get tasks() {
    return this._tasks;
  }
}
