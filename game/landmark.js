class Landmark {
  constructor(landmarkDiv, animationInterval) {
    this._landmarkDiv = landmarkDiv;
    this._animationInterval = animationInterval;
  }

  get landmarkDiv() {
    return this._landmarkDiv;
  }

  get animationInterval() {
    return this._animationInterval;
  }
}