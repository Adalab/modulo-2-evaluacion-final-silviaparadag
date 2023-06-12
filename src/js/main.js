'use strict';
/* */
console.log('>> Ready :)');

// QUERIES
const cardList = document.querySelector('.js_list');
const cardListFav = document.querySelector('.js_list_fav');
const cardElem = document.querySelector('.js_card');


console.log(cardElem);

// VARIABLES
const serverURL = `https://api.disneyapi.dev/character?page=50`;

let disneyDataList = [];
let disneyDataListFav = [];

/*
const lsFavCardsList = localStorage.getItem('lsFavCards');
console.log(lsFavCardsList);

start ();
function start () {
  if (lsFavCardsList) {
    disneyDataListFav = lsFavCardsList;
    renderAllCharacters ();
  } else {

  }
}
*/

//FETCH
/* */
fetch(serverURL)
  .then((response) => response.json())
  .then((listData) => {
    console.log(listData);
    disneyDataList = listData.data;
    renderAllCharacters(disneyDataList);
  });


// FUNCTIONS
/* */
function renderAllCharacters (list) {
  for (const eachCharacter of list ) {
    cardList.innerHTML += renderOneCharacter(eachCharacter);
  }
  addEventCards();
}

function renderOneCharacter(disneyDataObj) {
  let html = `<li id="${disneyDataObj._id}" class="card js_card">
                <article class="character__box">
                <img class="character__img js_img" src="${disneyDataObj.imageUrl}" alt="Disney Characters" />
                <p class="character__name js_name">${disneyDataObj.name}</p>
                </article>
            </li>`;
  return html;
}

/* */
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
  localStorage.setItem('lsFavCards', JSON.stringify(disneyDataListFav));
  renderFavCardList ();
}

function renderFavCardList () {
  cardListFav.innerHTML = '';
  for ( const fav of disneyDataListFav) {
    cardListFav.innerHTML += renderOneCharacter(fav);
    //changeColor(fav);
  }
}




/*
function changeColor () {
  cardElem.classList.remove('card');
  cardElem.classList.add('card_fav');
}*/

/*
.classList.add('card_fav');
.classList.remove('card');
cardElem.classList.contains('card')
*/

// EVENTS
// event.preventDefault();
