var mission = new Mission([]);
var menuMain;
var missionInterval;
var noLives;
var prefixe=["","moz","MS","o","webkit"];


var landmarks = [];


function rand(a, b){
  return Math.floor(Math.random() * (b - a) + a);
}

function createDiv(name) {
  var div = document.createElement('div');
  div.id = name;

  return div;
}

function checkLandmarkAppearedComplete(landmark) {
  if (landmark.offsetLeft + landmark.offsetWidth - window.innerWidth <= -100)
    return true;
  return false;
}

function checkAndAddNewLandmark() {

  var land = document.getElementById('land');
  if (land != null) {
    if (landmarks.length === 0 || (landmarks.length !== 0 &&
        checkLandmarkAppearedComplete(landmarks[landmarks.length - 1]) === true)) {
      var landmarkIndex = Math.floor(Math.random() * constants.getNoLandmarks());
      var landmarksList = constants.getLandmarks();
      var landmark = document.createElement('div');

     landmark.classList.add('landmarkDiv');
      var landmarkImage = document.createElement('img');
      landmarkImage.src = `images/${landmarksList[landmarkIndex]}.png`;
      landmarkImage.classList.add('landmarkImage');
      landmark.appendChild(landmarkImage);
      for (var i = 0; i < prefixe.length; i++)
        landmark.addEventListener(prefixe[i] + 'AnimationEnd', function() {
          if (landmark.parentNode !== null) {
            land.removeChild(landmark);
            landmarks.slice(0, 1);
          }
      });

      landmarks.push(landmark);
      land.appendChild(landmark);
    }
  }
  currentFrame = requestAnimationFrame(checkAndAddNewLandmark);
}

function generateMission() {
  var noTasks = rand(1, constants.getMaxTasks() + 1);
  mission.clear();
  for (var i = 0; i < noTasks; ++i) {
    var landmark = constants.getLandmarks()[rand(0, constants.getNoLandmarks())];
    var key = constants.getActions()[rand(0, constants.getNoActions())];
    var task = new Task(landmark, key);
    mission.addTask(task);
  }
}

function addMission() {
  var divMission = document.getElementById('mission');
  var title = Array.prototype.slice.call(divMission.children);
  divMission.innerHTML = '';
  title.slice(0, 1);
  divMission.appendChild(title[0]);

  var tasks = mission.tasks;
  for (var i = 0; i < tasks.length; ++i) {
    var divTask = document.createElement('div');
    divTask.classList.add('containerDiv');
    divTask.classList.add('inlineBlockDiv');
    var landmark = document.createElement('span');
    landmark.textContent = tasks[i].landmark;
    landmark.classList.add('landmarkMission');
    var action = document.createElement('span');
    action.textContent = tasks[i].action;
    action.classList.add('actionMission');

    divTask.appendChild(landmark);
    divTask.appendChild(action);
    divMission.appendChild(divTask);
  }
}

function changeMission() {
  generateMission();
  addMission();
}

function createGameLayout() {
  var playMain = document.createElement('main');
  playMain.appendChild(createDiv('land'));
  playMain.appendChild(createDiv('border'));
  playMain.appendChild(createDiv('sidewalk'));

  document.body.appendChild(playMain);

  generateMission();
  var backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.classList.add('backButton');
  backButton.addEventListener('click', function() {
    backToMainMenu();
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
  addMission();
  document.getElementById('sidewalk').appendChild(backButton);
  document.getElementById('sidewalk').appendChild(player.avatar);

  var livesDiv = document.createElement('div');
  livesDiv.classList.add('containerDiv');
  livesDiv.id = 'livesDiv';
  var noLivesSpan = document.createElement('span');
  noLivesSpan.classList.add('centeredSpan');
  noLivesSpan.id = 'noLivesSpan';
  noLivesSpan.textContent = noLives;
  livesDiv.appendChild(noLivesSpan);
  document.getElementById('sidewalk').appendChild(livesDiv);
}

function testCollision(top1, left1, h1, w1, top2, left2, h2, w2){
  if(left1< left2+ w2 &&
    left1+ w1> left2 &&
    top1 < top2 + h2 &&
    top1 + h1 > top2) {
    return true;
  }
}

function acceptedCollision() {
  var character = document.getElementById('character');
  var characterStyle = getComputedStyle(character);
  var elements = document.querySelectorAll('.landmarkDiv');
  for (var i = 0; i < elements.length; ++i) {
    var landmarkDivStyle = getComputedStyle(elements[i]);
  }
}

function gameOver() {
  var elements = document.querySelectorAll('.landmarkDiv');
  for (var i = 0; i < elements.length; ++i) {
    elements[i].style.webkitAnimationPlayState = 'paused';
    elements[i].style.mozAnimationPlayState = 'paused';
    elements[i].style.oAnimationPlayState = 'paused';
  }
  if (!alert("Game Over!")) {
    backToMainMenu();
  }
}

function decreaseNoLives() {
  noLives--;
  if (noLives < 0)
    gameOver();
  else document.getElementById('noLivesSpan').textContent = noLives;
}

window.onkeydown = function(e){
  var key = String.fromCharCode(e.keyCode).toLocaleLowerCase();
  console.log(key);
  switch(key) {
    case 'p':
    case 'u':
    case 'v':
      var landmark = acceptedCollision();
      if (landmark !== null) {
        if (mission.completeTask(landmark, key) === true)
          break;
        else {
          decreaseNoLives();
        }
      }
      else {
        decreaseNoLives();
      }
      break;
    case 'q':
      gameOver();
    default:
      decreaseNoLives()
      break;
  }
}

function startGame() {
  missionInterval = setInterval(changeMission, constants.getMissionInterval());
  requestAnimationFrame(checkAndAddNewLandmark);
}

function playButtonClicked() {
  var header = document.querySelector('header');
  if (header)
    document.body.removeChild(header);
  menuMain = document.body.getElementsByTagName('main')[0];
  document.body.removeChild(menuMain);
  document.body.style.padding = 0;

  noLives = getLocalStorage('nolives');
  createGameLayout();
  startGame();
}

function backToMainMenu() {
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
  document.body.appendChild(menuMain);
}

function settingsButtonClicked() {
  menuMain = document.body.getElementsByTagName('main')[0]  ;
  document.body.removeChild(menuMain);

  var header = document.querySelector('header');
  header.innerHTML = '';
  var title = document.createElement('h1');
  title.textContent = 'SETTINGS';
  var backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.classList.add('backButton');
  backButton.addEventListener('click', function() {
    backToMainMenu();
  });
  header.appendChild(backButton);
  header.appendChild(title);

  settingsCreateLayout();
}
