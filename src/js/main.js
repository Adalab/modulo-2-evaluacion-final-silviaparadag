'use strict';
/* */
console.log('>> Ready :)');

// QUERIES
const cardList = document.querySelector('.js_list');
const cardListFav = document.querySelector('.js_list_fav');
const cardElem = document.querySelector('.js_card');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const resetBtn  = document.querySelector('.js_resetBtn');
//const deleteFavBtn = document.querySelector('.js_close-btn');



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
/* */
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
/* */
function renderAllCharacters (list) {
  cardList.innerHTML = '';
  for (const eachCharacter of list ) {
    cardList.innerHTML += renderOneCharacter(eachCharacter);
  }
  addEventCards();
}

function renderOneCharacter(disneyDataObj) {
  const elemIndex = disneyDataListFav.findIndex( (elem) => elem._id === disneyDataObj._id );
  let elemClass = '' ;
  if (elemIndex !== -1) {
    elemClass = 'card__fav';
  }
  if (disneyDataObj.imageUrl === undefined) {
    disneyDataObj.imageUrl = emptyURL;
  }
  //jean geary 2585
  let html = `<li id="${disneyDataObj._id}" class="card ${elemClass} js_card">
                <article class="character">
                <img class="character__img js_img" src="${disneyDataObj.imageUrl}" alt="Disney Characters" />
                <p class="character__name js_name">${disneyDataObj.name}</p>
                </article>
            </li>`;
  return html;
}

/* 
function addBtnDelete () {
  if (cardElem.classList.contains('card__fav')) {
    const deleteBtn = document.createElement('div');
    const deleteBtnX = document.createTextNode('x');
    deleteBtn.appendChild(deleteBtnX);
    cardElem.appendChild(deleteBtn);
  }
}
*/

/*
  <div class="card__btn js-btn"><button class="card__btn--x js_close-btn">x</button></div>
    const deleteBtn = document.createElement('div');
    //const deleteBtnX = document.createTextNode('x');
    cardElem.appendChild(deleteBtn);
*/


function addEventCards () {
  const cardElemList = document.querySelectorAll('.js_card');
  for( const card of cardElemList ) {
    card.addEventListener ('click', handleFav);
    //card.classList.toggle('card');
    //card.classList.toggle('card_fav');
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
  //addBtnDelete ();
}

function renderFavCardList () {
  cardListFav.innerHTML = '';
  for ( const fav of disneyDataListFav) {
    cardListFav.innerHTML += renderOneCharacter(fav);
    //changeColor(fav);
  }
}


/*
.classList.add('card_fav');
.classList.remove('card');
cardElem.classList.contains('card')
*/

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
  /*
  const filterCharacter = disneyDataList.filter((elem) => elem.name.toLowerCase().includes(inputValue.toLowerCase()));
  console.log(filterCharacter);
  renderAllCharacters(filterCharacter); */
};

const handleReset = (event) => {
  event.preventDefault();
  console.log('holis');
  // cardListFav.innerHTML = '';
  // localStorage.removeItem('lsFavCards');
};

// EVENTS
btnSearch.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);



/* PENDIENTE:
  3.1- Color de fondo y texto se intercambia mal

  6.- Borrar favoritos, tanto con un click como con del almacenamiento local.
 Añadir botón X al listado de FAVORITOS 
 y después evento para borrar desde Local Storage
localStorage.removeItem('lsFavCards');
*/

