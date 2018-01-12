class Task {
  constructor(landmark, action) {
    this._landmark = landmark;
    this._action = action;
  }

  get landmark() {
    return this._landmark;
  }

  get action() {
    return this._action;
  }
}