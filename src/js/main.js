'use strict';
/* */
console.log('>> Ready :)');

// QUERIES
const cardList = document.querySelector('.js_list');
const cardListFav = document.querySelector('.js_list_fav');
const cardElem = document.querySelector('.js_card');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');


console.log(cardElem);

// VARIABLES
const serverURL = `https://api.disneyapi.dev/character?page=50`;
//const serverSearchURL = `https://api.disneyapi.dev/character?name=Mickey%20Mouse`;

let disneyDataList = [];
let disneyDataListFav = [];


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
    elemClass = 'card_fav';
  }
  let html = `<li id="${disneyDataObj._id}" class="card ${elemClass} js_card">
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
  setInLocalStorage ();
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
.classList.add('card_fav');
.classList.remove('card');
cardElem.classList.contains('card')
*/

// EVENTS

const handleSearch = (event) => {
  event.preventDefault();
  const inputValue = inputSearch.value;
  fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${inputValue}`)
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

btnSearch.addEventListener('click', handleSearch);




// PENDIENTE:

/*
2.a.- Cuando no haya imagen poner una tipo placeholder:
https://via.placeholder.com/210x295/ffffff/555555/?text=Disney

3.1- Color de fondo y texto se intercambia


5.- Búsqueda: Qué es lo de conectarse a la API? Como lo de StarWars?

6.- Borrar favoritos, tanto con un click como con del almacenamiento local.


*/

// DUDAS:

/*
3.1.a- Se cambia el color en favoritos o en el listado general. 
3.1.b- Asignar la clase al elemento, error.

5.a- Búsqueda: Qué es lo de conectarse a la API? Buscar por algo más además del nombre?
5.b- Mantener las búsquedas.


*/