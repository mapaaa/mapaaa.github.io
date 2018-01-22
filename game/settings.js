var languages, avatars, lives, drinks;

function insertNameInput() {
  var div = document.createElement('div');
  div.classList.add('inputDiv');

  var label = document.createElement('label');
  label.textContent = 'Name: ';
  label.for = 'name';
  var input = document.createElement('input');
  input.type = 'text';
  input.value = getLocalStorage('name');
  input.id = 'name';
  div.appendChild(label);
  div.appendChild(input);
  return div;
}

function insertAvatarInput() {
  var div = document.createElement('div');
  div.classList.add('inputDiv');

  var label = document.createElement('label');
  label.textContent = 'Select Avatar';
  label.for = 'avatar';
  div.appendChild(label);
  div.appendChild(document.createElement('br'));

  var localStorageAvatar = getLocalStorage('avatar');
  for (var i = 0; i < avatars.length; ++i) {
    var avatar = document.createElement('div');
    var input = document.createElement('input');
    input.type = 'radio';
    input.name = 'avatar';
    input.value = avatars[i].getElementsByTagName('path')[0].textContent;
    var inputImg = document.createElement('img');
    var path = avatars[i].getElementsByTagName('path')[0].textContent;
    inputImg.src = path;
    inputImg.classList.add('inputImage');
    if (path === localStorageAvatar) {
      input.checked = true;
    }
    avatar.appendChild(input);
    avatar.appendChild(inputImg);
    div.appendChild(avatar);
  }
  return div;
}

function insertNumberOfLives() {
  var div = document.createElement('div');
  div.classList.add('inputDiv');

  var label = document.createElement('label');
  label.textContent = 'Number of lives: ';
  label.for = 'lives';
  var input = document.createElement('input');
  input.type = 'range';
  input.min = constants.getMinLives();
  input.max = constants.getMaxLives();
  input.value = getLocalStorage('nolives');
  input.id = 'lives';
  input.name = 'lives';
  var outputLives = document.createElement('output');
  outputLives.for = 'lives';
  outputLives.value = input.value;

  //Both for browser compatibility
  input.addEventListener('input', function() {
    outputLives.value = input.value;
  });
  input.addEventListener('change', function() {
    outputLives.value = input.value;
  });


  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(outputLives);
  return div;
}

function insertDrinks() {
  var div = document.createElement('div');
  div.classList.add('inputDiv');

  var label = document.createElement('label');
  label.textContent = 'Select Drinks';
  label.for = 'drinks';
  div.appendChild(label);
  div.appendChild(document.createElement('br'));

  var localStorageDrinks = getLocalStorage('drinks');
  //console.log(localStorageDrinks);

  for (var i = 0; i < drinks.length; ++i) {
    var drink = document.createElement('div');
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'drinks';
    input.id = drinks[i].getElementsByTagName('name')[0].textContent;
    var inputImg = document.createElement('img');
    var path = drinks[i].getElementsByTagName('path')[0].textContent;
    input.value = path;
    inputImg.src = path;
    var found = localStorageDrinks.indexOf(path);
    if  (found !== -1) {
      input.checked = true;
    }
    inputImg.classList.add('inputImage');

    drink.appendChild(input);
    drink.appendChild(inputImg);
    div.appendChild(drink);
  }
  return div;
}

function insertLanguage() {
  var div = document.createElement('div');
  div.classList.add('inputDiv');

  var label = document.createElement('label');
  label.textContent = 'Select language';
  label.for = 'lang';
  var select = document.createElement('select');
  select.id = 'lang';
  select.name = 'lang';

  var langLocalStorage = getLocalStorage('lang');
  for (var i = 0; i < languages.length; ++i) {
    var option = document.createElement('option');
    option.value = option.textContent = languages[i].textContent;
    if (option.value === langLocalStorage) {
      option.selected = true;
    }
    select.appendChild(option);
  }
  div.appendChild(label);
  div.appendChild(select);
  return div;
}

function insertFunnyMessage() {
  var div = document.createElement('div');
  div.classList.add('inputDiv');

  var label = document.createElement('label');
  label.textContent = 'Change funny message';
  label.for = 'funny';
  var textarea = document.createElement('textarea');
  textarea.id = 'funny';
  textarea.name = 'funny';
  textarea.textContent = getLocalStorage('funny');
  div.appendChild(label);
  div.appendChild(textarea);
  return div;
}

function getSettings(xml) {
  var xmlDoc = xml.responseXML;

  languages = xmlDoc.getElementsByTagName('language');
  avatars = xmlDoc.getElementsByTagName('avatar');
  lives = xmlDoc.getElementsByTagName('lives');
  drinks = xmlDoc.getElementsByTagName('drink');
}

function saveChanges() {
  var r = 0;
  var g = 0;
  var b = 0;

  var selected = false;
  var selectMultiple = document.querySelector('[id=cbc]');
  for (var i = 0; i < selectMultiple.options.length; ++i) {
      if (selectMultiple.options[i].selected === true) {
        selected = true;
        switch (selectMultiple.options[i].value) {
          case 'red': r = 255; break;
          case 'green': g = 255; break;
          case 'blue': b = 255; break;
        }
      }
  }

  console.log(selected);
  if (!selected) {
     r = 255;
     g = 255;
     b = 255;
  }

 // document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  document.body.style.backgroundColor = 'rgb(' + r.toString() + ', ' + g.toString() + ', ' + b.toString() + ')';

  var pName = document.querySelector('#name');
  if (pName !== null) {
    if (/^([A-Z])([a-z0-9]*)$/.test(pName.value))
     setLocalStorage('name', pName.value);
    else {
      alert('Name must start with capital letter followed by small letters and digits. Note that other changes may have been saved.');
    }
  }

  var pFunny = document.getElementsByName('funny')[0];
  if (pFunny) {
    if (pFunny.value.length <= 50) {
      setLocalStorage('funny', pFunny.value);
    }
    else {
      alert('Funny message too big :( Please limit to 50 characters. Note that other changes may have been saved.');
    }
  }


  var pAvatar = document.querySelectorAll('[name=avatar]');
  for (var i = 0; i < pAvatar.length; ++i) {
    if (pAvatar[i].checked)
      setLocalStorage('avatar', pAvatar[i].value);
  }

  var pNoLives = document.getElementsByName('lives')[0];
  if (pNoLives)
    setLocalStorage('nolives', pNoLives.value.toString());

  var pDrinks = document.getElementsByName('drinks');
  if (pDrinks) {
    var selectedDrinks = [];
    for (var i = 0; i < pDrinks.length; ++i) {
      if (pDrinks[i].checked)
        selectedDrinks.push(pDrinks[i].value);
    }
    if (selectedDrinks.length) {
      console.log(selectedDrinks);
      setLocalStorage('drinks', selectedDrinks.toString());
    }
  }

  var pLang = document.getElementsByName('lang')[0];
  if (pLang)
    setLocalStorage('lang', pLang.value);

  alert('Changes saved. Press Back to go to Main Menu');
}

function insertMultipleSelect() {
  var div = document.createElement('div');
  div.classList.add('inputDiv');

  var label = document.createElement('label');
  label.textContent = 'Change Background Color';
  label.for = 'cbc';

  var select = document.createElement('select');
  select.multiple = true;
  select.id = 'cbc';

  var option1 = document.createElement('option');
  option1.value = 'red';
  option1.textContent = 'red';
  option1.dataset.code = 'rgb(255, 0, 0)';


  var option2 = document.createElement('option');
  option2.value = 'green';
  option2.textContent = 'green';
  option2.dataset.code = 'rgb(0, 255, 0)';

  var option3 = document.createElement('option');
  option3.value = 'blue';
  option3.textContent = 'blue';
  option3.dataset.code = 'rgb(0, 0, 255)';

  select.appendChild(option1);
  select.appendChild(option2);
  select.appendChild(option3);

  div.appendChild(label);
  div.appendChild(select);

  return div;
}

function settingsCreateLayout() {

  document.body.style.paddingBottom = '5em';
  document.body.style.paddingLeft = '5em';
  document.body.style.paddingRight = '5em';

  // Insert main
  var main = document.createElement('main');

  // Insert inputs
  var div = document.createElement('div');
  div.classList.add('containerDiv');

  // Load settings xml
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      getSettings(this);
      div.appendChild(insertNameInput()); // text
      div.appendChild(insertAvatarInput()); // radio
      div.appendChild(insertNumberOfLives()); // range
      div.appendChild(insertDrinks()); // checkbox
      div.appendChild(insertLanguage()); // select simple
      div.appendChild(insertFunnyMessage()); // textarea
      div.appendChild(insertMultipleSelect()); // weird background color

      main.appendChild(div);
      var divButton = document.createElement('div');
      divButton.classList.add('containerDiv');
      var sendButton = document.createElement('button');
      sendButton.textContent = 'Save changes';
      sendButton.classList.add('sendButton');
      sendButton.addEventListener('click', saveChanges);
      divButton.style.marginTop = '5em';
      divButton.appendChild(sendButton);
      main.appendChild(divButton);
      document.body.appendChild(main);
    }
  };
  xhttp.open("GET", "xml/settings.xml", true);
  xhttp.send(null);


}
