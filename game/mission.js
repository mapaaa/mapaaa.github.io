class Mission {
  constructor(tasks) {
    this._tasks = tasks;
    this._completedTask = [tasks.length, false];
    this._cntCompleted = 0;
  }

  addTask(task) {
    this._tasks.push(task);
  }

  clear() {
    this._tasks = [];
  }

  completeTask(landmark, key) {
    console.log(`I want ${landmark} and ${key}`);
    var ind = this._tasks.findIndex(function(element){
      return element.landmark === landmark && element.key === key;
    });
    if (ind !== -1) {
      if (!this._completedTask[ind]) {
        this._completedTask[ind] = true;
        ++this._cntCompleted;
      }
      this._tasks[ind].completeTask();
      return true;
    }
    return false;
  }

  get tasks() {
    return this._tasks;
  }
}
