constants = (function() {
  var MIN_LIVES = 0;
  var MAX_LIVES = 4;
  var NO_LANDMARKS = 5;
  var LANDMARKS = ['museum', 'park', 'statue', 'coffeeshop', 'coffeeshop'];
  var ACTIONS = ['p', 'u', 'v'];
  var NO_ACTIONS = 3;
  var MAX_TASKS = 3;
  var ANIMATION_SPEED = 500;
  var MISSION_INTERVAL = 10000;

  return {
    getNoLandmarks: function() {
      return NO_LANDMARKS;
    },
    getLandmarks: function() {
      return LANDMARKS;
    },
    getActions: function() {
      return ACTIONS;
    },
    getNoActions: function() {
      return NO_ACTIONS;
    },
    getMinLives:function() {
      return MIN_LIVES;
    },
    getMaxLives:function () {
      return MAX_LIVES;
    },
    getMaxTasks:function() {
      return MAX_TASKS;
    },
    getMissionInterval: function () {
      return MISSION_INTERVAL;
    }
  }
})();