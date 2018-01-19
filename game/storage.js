// Game settings
var player = new Character();
var playerLang;
var playerDrinks;
var playerNoLives;
var playerFunny;


window.onload = function () {
  // Initialize or get data from local storage
  console.log('local storage');
  if (!(player.name = localStorage.getItem('name'))) {
    player.name = 'Mia';
    localStorage.setItem('name', player.name);
  }
  if (!(player.avatar = localStorage.getItem('avatar'))) {
    player.avatar = `images/cat.png`;
    localStorage.setItem('avatar', 'images/cat.png');
  }
  if (!(playerLang = localStorage.getItem('lang'))) {
    playerLang = 'English';
    localStorage.setItem('lang', playerLang);
  }
  if (!(playerDrinks = localStorage.getItem('drinks'))) {
    playerDrinks = ['images/cola.png'];
    localStorage.setItem('drinks', playerDrinks.toString());
  }
  else {
    playerDrinks = Array.from(playerDrinks.split(','));
  }
  if (!(playerNoLives = localStorage.getItem('nolives'))) {
    playerNoLives = 3;
    localStorage.setItem('nolives', '3');
  }
  else
    playerNoLives = parseInt(playerNoLives);
  if (!(playerFunny = localStorage.getItem('funny'))) {
    playerFunny = 'You rock!';
    localStorage.setItem('funny', playerFunny);
  }

  if (MYGAME.currentWindow === 0) {
    var date = document.getElementById('date');
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    date.textContent = `${day} / ${month} / ${year}`;
  }
};

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
  if (key === 'name')
    player.name = value;
  if (key === 'avatar')
    player.avatar = value;
}

function getLocalStorage(key) {
  var ans = localStorage.getItem(key);
  if (!ans)
    return null;
  else {
    switch (key) {
      case 'name':
      case 'avatar':
      case 'lang':
      case 'funny':
        return ans;
        break;
      case 'drinks':
        return Array.from(ans.split(','));
        break;
      case 'nolives':
        return parseInt(ans);
        break;
    }
  }
}