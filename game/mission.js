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

  completeTask(landmark, key) {
    console.log(`I want ${landmark} and ${key}`);
    var ind = this._tasks.findIndex(function(element){
      return element.landmark === landmark && element.key === key;
    });
    return ind !== -1;
  }

  get tasks() {
    return this._tasks;
  }
}
