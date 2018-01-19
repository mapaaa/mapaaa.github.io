class Character {
  constructor() {
  }

  set name(newName) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }

  set avatar(newAvatar) {
    if (typeof(newAvatar) === "string") {
      this._avatar = document.createElement('img');
      this._avatar.src = newAvatar;
      this._avatar.id = 'character';
      this._avatar.classList.add('character');
    }
    else {
      this._avatar = newAvatar;
    }
  }

  get avatar() {
    return this._avatar;
  }
}