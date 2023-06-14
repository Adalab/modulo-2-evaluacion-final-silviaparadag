'use strict';

// QUERIES
const cardList = document.querySelector('.js_list');
const cardListFav = document.querySelector('.js_list_fav');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const resetBtn  = document.querySelector('.js-reset');
const logBtn = document.querySelector('.js_btnLog');


// VARIABLES API
const serverURL = `https://api.disneyapi.dev/character?page=50`;
const serverSearchURL = `https://api.disneyapi.dev/character?pageSize=50&name=`;
const emptyURL = `https://via.placeholder.com/210x295/fbebf9/555555/?text=Disney%20character%20image%20not%20avaliable`;

// VARIABLES GLOBALES
let disneyDataList = [];
let disneyDataListFav = [];


// VARIABLES LS
const setInLocalStorage = () => {
  localStorage.setItem('lsFavCards', JSON.stringify(disneyDataListFav));
};

const getFromLocalStorage = () => {
  const lsFavCardsList = localStorage.getItem('lsFavCards');
  if (lsFavCardsList !== null) {
    disneyDataListFav = JSON.parse(lsFavCardsList);
    renderFavCardList ();
  }
};
getFromLocalStorage();


//FETCH
const getApiData = () => {
  fetch(serverURL)
    .then((response) => response.json())
    .then((listData) => {
      console.log(listData);
      disneyDataList = listData.data;
      renderAllCharacters(disneyDataList);
    });
};
getApiData ();

const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  fetch(serverSearchURL+`${inputValue}`)
    .then((response) => response.json())
    .then((listData) => {
      disneyDataList = listData.data;
      renderAllCharacters(disneyDataList);
    });
};


// FUNCTIONS

function renderOneCharacter(disneyDataObj, isFav) {
  const elemIndex = disneyDataListFav.findIndex( (elem) => elem._id === disneyDataObj._id );
  let elemClass = '' ;
  let btnDelete = '';
  if (isFav) {
    btnDelete = '<div class="card__btn js_deleteFav"><button class="card__btn--x js_deleteFav-btn">x</button></div>';
  } else {
    elemClass = 'js_card ';
  }
  if (elemIndex !== -1) {
    elemClass += 'card__fav';
  }
  if (disneyDataObj.imageUrl === undefined) {
    disneyDataObj.imageUrl = emptyURL;
  }
  let html = `<li id="${disneyDataObj._id}" class="card ${elemClass}">`;
  html += `${btnDelete}`;
  html += `<article class="character">`;
  html += `<img class="character__img js_img" src="${disneyDataObj.imageUrl}" alt="Disney Characters" />`;
  html += `<p class="character__name js_name">${disneyDataObj.name}</p>`;
  html += `<a href="${disneyDataObj.sourceUrl}">${disneyDataObj.sourceUrl}</a>`;
  html += `</article>
            </li>`;
  return html;
}

function renderAllCharacters (list) {
  cardList.innerHTML = '';
  for (const eachCharacter of list ) {
    cardList.innerHTML += renderOneCharacter(eachCharacter);
  }
  addEventCards();
}

function addEventCards () {
  const cardElemList = document.querySelectorAll('.js_card');
  for( const card of cardElemList ) {
    card.addEventListener ('click', handleFav);
  }
}

function renderFavCardList () {
  cardListFav.innerHTML = '';
  for ( const fav of disneyDataListFav) {
    cardListFav.innerHTML += renderOneCharacter(fav, true);
  }
  const deleteFavBtn = document.querySelectorAll('.js_deleteFav');
  for( const eachFav of deleteFavBtn ) {
    eachFav.addEventListener('click', handleDelete);
  }
}

function handleFav (ev) {
  event.preventDefault();
  const id = parseInt(ev.currentTarget.id);
  const selectedCard = disneyDataList.find((elem) => elem._id === id);
  const indexCard = disneyDataListFav.findIndex( (elem) => elem._id === id);
  if (indexCard === -1) {
    disneyDataListFav.push(selectedCard);
  }
  else {
    disneyDataListFav.splice(indexCard, 1);
  }
  setInLocalStorage ();
  renderFavCardList ();
  renderAllCharacters(disneyDataList);
}

function handleReset (event) {
  event.preventDefault();
  disneyDataListFav = [];
  renderFavCardList ();
  localStorage.removeItem('lsFavCards');
  renderAllCharacters(disneyDataList);
}

function handleDelete (event) {
  const id = parseInt(event.currentTarget.id);
  const indexCard = disneyDataListFav.findIndex( (elem) => elem._id === id);
  disneyDataListFav.splice(indexCard, 1);
  renderFavCardList ();
  renderAllCharacters(disneyDataList);
}

function handleLog (ev) {
  ev.preventDefault();
  for ( const eachFav of disneyDataListFav) {
    console.log(eachFav.name);
  }
};

// EVENTS
btnSearch.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);
logBtn.addEventListener('click', handleLog);
