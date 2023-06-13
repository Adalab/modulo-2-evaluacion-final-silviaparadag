'use strict';

// QUERIES
const cardList = document.querySelector('.js_list');
const cardListFav = document.querySelector('.js_list_fav');
const cardElem = document.querySelector('.js_card');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const resetBtn  = document.querySelector('.js-reset');


// VARIABLES API
const serverURL = `https://api.disneyapi.dev/character?page=50`;
const serverSearchURL = `https://api.disneyapi.dev/character?pageSize=50&name=`;
const emptyURL = `https://via.placeholder.com/210x295/fbebf9/555555/?text=Disney%20character%20image%20not%20avaliable`;

// VARIABLES globales
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


// FUNCTIONS
function renderAllCharacters (list) {
  cardList.innerHTML = '';
  for (const eachCharacter of list ) {
    cardList.innerHTML += renderOneCharacter(eachCharacter);
  }
  addEventCards();
}

function renderOneCharacter(disneyDataObj, isFav) {
  const elemIndex = disneyDataListFav.findIndex( (elem) => elem._id === disneyDataObj._id );
  let elemClass = '' ;
  let btnDelete = '';
  if (isFav) {
    btnDelete = '<div class="card__btn js_deleteFav"><button class="card__btn--x js_deleteFav-btn">x</button></div>';
  }
  if (elemIndex !== -1) {
    elemClass = 'card__fav';
  }
  if (disneyDataObj.imageUrl === undefined) {
    disneyDataObj.imageUrl = emptyURL;
  }
  let html = `<li id="${disneyDataObj._id}" class="card ${elemClass} js_card"> ${btnDelete}`;
  html += `<article class="character">`;
  html += `<img class="character__img js_img" src="${disneyDataObj.imageUrl}" alt="Disney Characters" />`;
  html += `<p class="character__name js_name">${disneyDataObj.name}</p>`;
  html += `</article>
            </li>`;
  return html;
}

function addEventCards () {
  const cardElemList = document.querySelectorAll('.js_card');
  for( const card of cardElemList ) {
    card.addEventListener ('click', handleFav);
  }
}

function handleFav (ev) {
  event.preventDefault();
  const id = parseInt(ev.currentTarget.id);
  console.log(id);
  const selectedCard = disneyDataList.find((elem) => elem._id === id);
  const indexCard = disneyDataListFav.findIndex( (elem) => elem._id === id);
  console.log(indexCard);
  if (indexCard === -1) {
    disneyDataListFav.push(selectedCard);
  }
  else {
    disneyDataListFav.splice(indexCard, 1);
  }
  setInLocalStorage ();
  renderFavCardList ();
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

// FETCH SEARCH
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
console.log('HOLIS');

function handleReset () {
  console.log('He hecho click');
  disneyDataListFav = [];
  renderFavCardList ();
  localStorage.removeItem('lsFavCards');
  if (cardElem.classList.contains('card_fav')) {
    cardElem.classList.remove('card_fav');
  }
  renderAllCharacters();
}

function handleDelete (event) {
  event.preventDefault();
  console.log('He hecho click en la X');
  const id = parseInt(event.currentTarget.id);
  const indexCard = disneyDataListFav.findIndex( (elem) => elem._id === id);
  disneyDataListFav.splice(indexCard, 1);
  renderFavCardList ();
}

// EVENTS
btnSearch.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);
