'use strict';
/* */
console.log('>> Ready :)');

// QUERIES
const cardList = document.querySelector('.js_list');


// VARIABLES
const serverURL = `https://api.disneyapi.dev/character?page=50`;


let disneyDataList = [];

// FETCH
fetch(serverURL)
  .then((response) => response.json())
  .then((listData) => {
    console.log(listData);
    disneyDataList = listData.data[46];
    console.log(disneyDataList.name);
    cardList.innerHTML = renderOneCharacter(disneyDataList);
  });


// FUNCTIONS

function renderOneCharacter() {
  let html = `<li id="${disneyDataList.__id}" class="card">
                <article>
                    <img class="character__img js_img" src="url${disneyDataList.imageUrl}" alt="Disney Characters" />
                    <p class="character__name js_name">${disneyDataList.name}</p>
                </article>
            </li>`;
  return html;
}

// EVENTS
