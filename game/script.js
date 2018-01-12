var mission = new Mission([]);
var menuMain;
var missionInterval;
var noLives;


var spawner = setInterval(checkAndAddNewLandmark(), constants.getSpawnSpeed());
var landmarks;


function rand(a, b){
  return Math.floor(Math.random() * (b - a) + a);
}

function createDiv(name) {
  var div = document.createElement('div');
  div.id = name;

  return div;
}

function checkLandmarkAppearedComplete(landmark) {
}

function checkAndAddNewLandmark() {
  /*if (landmarks.length === 0 || checkLandmarkAppearedComplete(landmarks[landmarks.length - 1]) === true) {
    var landmarkIndex = Math.floor(Math.random() * game.getNoLandmarks());
    var landmarksList = game.getLandmarks();
    var landmark = document.createElement('div');

    landmark.classList.add('landmark');
    var landmarkImage = document.createElement('img');
    landmarkImage.src = `images/${landmarksList[landmarkIndex]}.jpg`;
    landmark.appendChild(landmarkImage);

    landmarksList.push(new Landmark(landmarkImage, game.getAnimationSpeed()));
  }*/
}

function generateMission() {
  var noTasks = rand(1, constants.getMaxTasks() + 1);
  mission.clear();
  for (var i = 0; i < noTasks; ++i) {
    var landmark = constants.getLandmarks()[rand(0, constants.getNoLandmarks())];
    var action = constants.getActions()[rand(0, constants.getNoActions())];
    var task = new Task(landmark, action);
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
    console.log(tasks[i]);
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

function createLayout() {
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
  var noLivesSpan = document.createElement('button');
  noLivesSpan.textContent = noLives;
  livesDiv.appendChild(noLivesSpan);
  document.getElementById('sidewalk').appendChild(livesDiv);
}

function startGame() {
  var sidewalk = document.getElementById('sidewalk');
  missionInterval = setInterval(changeMission, constants.getMissionInterval());
}

function playButtonClicked() {
  var header = document.querySelector('header');
  if (header)
    document.body.removeChild(header);
  menuMain = document.body.getElementsByTagName('main')[0];
  document.body.removeChild(menuMain);
  document.body.style.padding = 0;

  noLives = getLocalStorage('nolives');
  createLayout();
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
