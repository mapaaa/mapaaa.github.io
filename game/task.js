class Task {
  constructor(landmark, key) {
    this._landmark = landmark;
    this._key = key;
  }

  get landmark() {
    return this._landmark;
  }

  get key() {
    return this._key;
  }
}