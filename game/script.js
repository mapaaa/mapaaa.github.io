var MYGAME = {

  canBeThirsty: false,
  drink: null,
  startX: 0,
  startY: 0,
  currentDrinkIndex: 0,
  cnt: 0,
  drank: false,
  mission: new Mission([]),
  menuMain: null,
  stopAnimationFrame: false,
  missionInterval: null,
  /*
    0 - menu
    1 - game
    2 - instructions
    3 - settings
   */

   currentWindow: 0,

  noLives: 0,
  prefixe: ["", "moz", "MS", "o", "webkit"],


  landmarks: [],


  rand: function(a, b) {
    return Math.floor(Math.random() * (b - a) + a);
  },

  createDiv: function(name) {
    var div = document.createElement('div');
    div.id = name;

    return div;
  },

  checkLandmarkAppearedComplete: function(landmark) {
    if (landmark.offsetLeft + landmark.offsetWidth - window.innerWidth <= -100)
      return true;
    return false;
  },

  checkAndAddNewLandmark: function() {

    var land = document.getElementById('land');
    if (land !== null) {
      if (MYGAME.landmarks.length === 0 || (MYGAME.landmarks.length !== 0 &&
          MYGAME.checkLandmarkAppearedComplete(MYGAME.landmarks[MYGAME.landmarks.length - 1]) === true)) {
        var landmarkIndex = Math.floor(Math.random() * constants.getNoLandmarks());
        var landmarksList = constants.getLandmarks();
        var landmark = document.createElement('div');

        landmark.classList.add('landmarkDiv');
        var landmarkImage = document.createElement('img');
        landmarkImage.src = `images/${landmarksList[landmarkIndex]}.png`;
        landmarkImage.classList.add('landmarkImage');
        landmark.appendChild(landmarkImage);
        for (var i = 0; i < MYGAME.prefixe.length; i++)
          landmark.addEventListener(MYGAME.prefixe[i] + 'AnimationEnd', function () {
            if (landmark.parentNode !== null) {
              land.removeChild(landmark);
              MYGAME.landmarks.slice(0, 1);
            }
          });

        /*landmark.style.borderColor = 'red';
        landmark.style.borderWidth = '1px';
        landmark.style.borderStyle = 'solid';*/
        landmark.dataset.type = landmarksList[landmarkIndex];
        MYGAME.landmarks.push(landmark);
        land.appendChild(landmark);
      }
    }
    if (!MYGAME.stopAnimationFrame)
      MYGAME.currentFrame = requestAnimationFrame(MYGAME.checkAndAddNewLandmark);
  },

  generateMission: function() {
    var noTasks = MYGAME.rand(1, constants.getMaxTasks() + 1);
    MYGAME.mission.clear();
    for (var i = 0; i < noTasks; ++i) {
      var landmark = constants.getLandmarks()[MYGAME.rand(0, constants.getNoLandmarks() - 2)];
      var key = constants.getActions()[MYGAME.rand(0, constants.getNoActions())];
      var task = new Task(landmark, key);
      MYGAME.mission.addTask(task);
    }
  },

  addMission: function() {
    var divMission = document.getElementById('mission');
    if (divMission !== null) {
      var title = Array.prototype.slice.call(divMission.children);
      divMission.innerHTML = '';
      title.slice(0, 1);
      divMission.appendChild(title[0]);

      var tasks = MYGAME.mission.tasks;
      for (var i = 0; i < tasks.length; ++i) {
        var divTask = document.createElement('div');
        divTask.classList.add('containerDiv');
        divTask.classList.add('inlineBlockDiv');
        var landmark = document.createElement('span');
        landmark.textContent = tasks[i].landmark;
        landmark.classList.add('landmarkMission');
        var action = document.createElement('span');
        action.textContent = tasks[i].key;
        action.classList.add('actionMission');

        divTask.appendChild(landmark);
        divTask.appendChild(action);
        tasks[i].taskDiv = divTask;
        divMission.appendChild(divTask);
      }
    }
  },

  changeMission: function() {
    MYGAME.generateMission();
    MYGAME.addMission();
  },

  createGameLayout: function() {
    document.body.style.overflow = 'hidden';
    MYGAME.canBeThirsty = true;
    var playMain = document.createElement('main');
    playMain.appendChild(MYGAME.createDiv('land'));
    playMain.appendChild(MYGAME.createDiv('border'));
    playMain.appendChild(MYGAME.createDiv('sidewalk'));

    document.body.appendChild(playMain);

    MYGAME.generateMission();
    var backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('backButton');
    backButton.addEventListener('click', function () {
      MYGAME.backToMainMenu();
    });
    var divMission = document.createElement('div');
    divMission.classList.add('mission');
    document.getElementById('sidewalk').appendChild(divMission);
    divMission.id = 'mission';
    var titleWrapper = document.createElement('div');
    titleWrapper.classList.add('containerDiv');
    var divMissionTitle = document.createElement('p');
    divMissionTitle.textContent = 'MISSION';
    titleWrapper.appendChild(divMissionTitle);
    divMission.appendChild(titleWrapper);
    MYGAME.addMission();
    document.getElementById('sidewalk').appendChild(backButton);
    console.log(player.avatar);
    document.getElementById('sidewalk').appendChild(player.avatar);

    var livesDiv = document.createElement('div');
    livesDiv.classList.add('containerDiv');
    livesDiv.id = 'livesDiv';
    var noLivesSpan = document.createElement('span');
    noLivesSpan.classList.add('centeredSpan');
    noLivesSpan.id = 'noLivesSpan';
    noLivesSpan.textContent = MYGAME.noLives;
    livesDiv.appendChild(noLivesSpan);
    document.getElementById('sidewalk').appendChild(livesDiv);
  },

  computeOverlap: function(l1, r1, l2, r2) {
    var left = Math.max(l1, l2);
    var right = Math.min(r1, r2);
    if (left <= right)
      return right - left;
    return -1;
  },


  acceptedCollision: function() {
    var character = document.getElementById('character');
    var characterRect = character.getBoundingClientRect();
    var elements = document.querySelectorAll('.landmarkDiv');
    var currentOverlap = -1;
    var landmark = null;
    for (var i = 0; i < elements.length; ++i) {
      var landmarkRect = elements[i].getBoundingClientRect();
      var overlap = MYGAME.computeOverlap(characterRect.left, characterRect.right,
        landmarkRect.left, landmarkRect.right);
      if (overlap !== -1 && overlap > currentOverlap) {
        currentOverlap = overlap;
        landmark = elements[i];
      }
    }
    return landmark;
  },

  gameOver: function(s) {
    var elements = document.querySelectorAll('.landmarkDiv');
    for (var i = 0; i < elements.length; ++i) {
      elements[i].style.webkitAnimationPlayState = 'paused';
      elements[i].style.mozAnimationPlayState = 'paused';
      elements[i].style.oAnimationPlayState = 'paused';
    }
    if (!s)
      s = 'Game Over!';
    s += ' ' + player.name + ', ' + playerFunny;
    if (!alert(s)) {
      MYGAME.backToMainMenu();
    }
  },

  decreaseNoLives: function() {
    MYGAME.noLives--;
    if (MYGAME.noLives < 0)
      MYGAME.gameOver();
    else document.getElementById('noLivesSpan').textContent = MYGAME.noLives.toString();
  },

  insideRect: function(x, w, y, h, a, b) {
    return (x <= a && a <= x + w && y <= b && b <= y + h);
  },

  deleteDrink: function() {
    ++MYGAME.cnt;
    if (drink !== null && MYGAME.cnt === MYGAME.currentDrinkIndex) {
      if (drink.parentNode !== null)
        drink.parentNode.removeChild(drink);
    }
  },

  dragMouseDown: function(e) {
    MYGAME.startX = e.clientX;
    MYGAME.startY = e.clientY;
    document.onmouseup = MYGAME.closeDragFunction;
    document.onmousemove = MYGAME.elementDrag;
  },

  elementDrag: function(e) {
    var newX = MYGAME.startX - e.clientX;
    var newY = MYGAME.startY - e.clientY;

    MYGAME.drink.style.left = (MYGAME.drink.offsetLeft - newX).toString() + 'px';
    MYGAME.drink.style.top = (MYGAME.drink.offsetTop - newY).toString() + 'px';

    MYGAME.startX = e.clientX;
    MYGAME.startY = e.clientY;
  },

  closeDragFunction: function(e) {
    document.onmouseup = null;
    document.onmousemove = null;
    var character = document.getElementById('character');
    var characterRect = character.getBoundingClientRect();
    //console.log(`${characterRect.left} ${characterRect.width} ${characterRect.top} ${characterRect.height} ${e.pageX} ${e.pageY}`);
    if (MYGAME.insideRect(characterRect.left, characterRect.width, characterRect.top, characterRect.height,
        e.clientX, e.clientY)) {
      MYGAME.stopAnimationFrame = true;
      MYGAME.drank = true;
      MYGAME.drink.parentNode.removeChild(drink);
      setTimeout(MYGAME.resumeAnimationFrame, 2000);
    }
  },

  resumeAnimationFrame: function() {
    MYGAME.stopAnimationFrame = false;
    requestAnimationFrame(MYGAME.checkAndAddNewLandmark);
  },

  thirsty: function() {
    if (MYGAME.canBeThirsty === true)
      if (MYGAME.drank === true) {
        MYGAME.drank = false;
      }
      else {
        MYGAME.gameOver('Game Over! You forgot to drink!');
      }
  },

  startGame: function() {
    MYGAME.missionInterval = setInterval(MYGAME.changeMission, constants.getMissionInterval());
    setInterval(MYGAME.thirsty, 20000);
    requestAnimationFrame(MYGAME.checkAndAddNewLandmark);
  },

  playButtonClicked: function() {

    var header = document.querySelector('header');
    if (header)
      document.body.removeChild(header);
    MYGAME.menuMain = document.body.getElementsByTagName('main')[0];
    document.body.removeChild(MYGAME.menuMain);
    document.body.style.padding = 0;

    MYGAME.noLives = playerNoLives;
    MYGAME.currentWindow = 1;
    MYGAME.createGameLayout();
    MYGAME.startGame();
  },

  backToMainMenu: function() {
    document.body.style.overflow = 'scroll';
    MYGAME.canBeThirsty = false;
    var header = document.querySelector('header');
    if (header)
      header.innerHTML = '';
    else {
      var header = document.createElement('header');
      document.body.appendChild(header);
    }
    var title = document.createElement('h1');
    title.textContent = 'A little game!';
    header.appendChild(title);
    document.body.removeChild(document.body.getElementsByTagName('main')[0]);
    document.body.appendChild(MYGAME.menuMain);
    MYGAME.currentWindow = 0;
  },

  settingsButtonClicked: function() {
    MYGAME.menuMain = document.body.getElementsByTagName('main')[0];
    document.body.removeChild(MYGAME.menuMain);

    var header = document.querySelector('header');
    header.innerHTML = '';
    var title = document.createElement('h1');
    title.textContent = 'SETTINGS';
    var backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('backButton');
    backButton.addEventListener('click', function () {
      MYGAME.backToMainMenu();
    });
    header.appendChild(backButton);
    header.appendChild(title);

    MYGAME.currentWindow = 3;
    settingsCreateLayout();
  },

};

window.onkeydown = function (e) {
  if (MYGAME.currentWindow === 1) {
    var key = String.fromCharCode(e.keyCode).toLocaleLowerCase();
    switch (key) {
      case 'p':
      case 'u':
      case 'v':
        var landmark = MYGAME.acceptedCollision();
        if (landmark !== null) {
          var landmarkName = landmark.dataset.type;
          if (MYGAME.mission.completeTask(landmarkName, key) === true)
            break;
          else {
            MYGAME.decreaseNoLives();
          }
        }
        else {
          MYGAME.decreaseNoLives();
        }
        break;
      case 'q':
        MYGAME.gameOver();
      default:
        MYGAME.decreaseNoLives();
        break;
    }
  }
};

window.onclick = function (e) {
  if (MYGAME.currentWindow === 1) {
    var elements = document.querySelectorAll('.landmarkDiv');
    for (var i = 0; i < elements.length; ++i) {
      if (elements[i].dataset.type === 'coffeeshop') {
        var coffeeshopRect = elements[i].getBoundingClientRect();
        if (MYGAME.insideRect(coffeeshopRect.left, coffeeshopRect.width, coffeeshopRect.top, coffeeshopRect.height,
            e.pageX, e.pageY)) {
          //start drag
          ++MYGAME.currentDrinkIndex;

          MYGAME.drink = document.createElement('img');
          MYGAME.drink.src = playerDrinks[MYGAME.rand(0, playerDrinks.length)];
          MYGAME.drink.id = 'drink';
          MYGAME.drink.classList.add('drink');
          MYGAME.drink.style.left = (e.pageX).toString() + 'px';
          MYGAME.drink.style.top = (e.pageY).toString() + 'px';
          elements[i].insertBefore(MYGAME.drink, elements[i].getElementsByTagName('img')[0]);
          MYGAME.drink.onmousedown = MYGAME.dragMouseDown;

        }
      }
    }
  }
};
