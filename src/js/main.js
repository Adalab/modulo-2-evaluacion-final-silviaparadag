'use strict';
/* */
console.log('>> Ready :)');

// QUERIES
const cardList = document.querySelector('.js_list');


// VARIABLES
const serverURL = `https://api.disneyapi.dev/character?page=50`;

let disneyDataList = [];


//FETCH
/* */
fetch(serverURL)
  .then((response) => response.json())
  .then((listData) => {
    console.log(listData);
    disneyDataList = listData.data;
    console.log(disneyDataList.name);
    renderAllCharacters(disneyDataList);
  });


// FUNCTIONS
/* */
function renderAllCharacters (list) {
  for (const eachCharacter of list ) {
    cardList.innerHTML += renderOneCharacter(eachCharacter);
  }
}


function renderOneCharacter(disneyDataObj) {
  let html = `<li id="${disneyDataObj.__id}" class="card">
                <article class="character__box">
                <img class="character__img js_img" src="${disneyDataObj.imageUrl}" alt="Disney Characters" />
                <p class="character__name js_name">${disneyDataObj.name}</p>
                </article>
            </li>`;
  return html;
}


/* */
// EVENTS
