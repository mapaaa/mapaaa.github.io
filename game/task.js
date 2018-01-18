class Task {
  constructor(landmark, key) {
    this._landmark = landmark;
    this._action = key;
  }

  get landmark() {
    return this._landmark;
  }

  get action() {
    return this._action;
  }
}