class Task {
  constructor(landmark, key) {
    this._landmark = landmark;
    this._key = key;
  }

  completeTask() {
    this._taskDiv.style.color = 'green';
  }

  set taskDiv(taskDiv) {
    this._taskDiv = taskDiv;
  }

  get taskDiv() {
    return this._taskDiv;
  }

  get landmark() {
    return this._landmark;
  }

  get key() {
    return this._key;
  }
}