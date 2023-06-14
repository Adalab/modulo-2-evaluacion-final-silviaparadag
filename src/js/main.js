'use strict';

// QUERIES
const sectionFav = document.querySelector('.js_fav');
const cardList = document.querySelector('.js_list');
const cardListFav = document.querySelector('.js_list_fav');
const divBtn = document.querySelector('.js_div');
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const resetBtn  = document.querySelector('.js-reset');


// VARIABLES API para simplificar el código de las funciones.
const serverURL = `https://api.disneyapi.dev/character?page=50`;
const serverSearchURL = `https://api.disneyapi.dev/character?pageSize=50&name=`;
const emptyURL = `https://via.placeholder.com/210x295/fbebf9/555555/?text=Disney%20character%20image%20not%20avaliable`;

// VARIABLES GLOBALES
let disneyDataList = []; // variable para almacenar datos de la API
let disneyDataListFav = []; //variable para almacenar favoritos



// VARIABLES LS
// 4️⃣ ⏩️
const setInLocalStorage = () => {
  localStorage.setItem('lsFavCards', JSON.stringify(disneyDataListFav));
};

/*
🔼
En SET, guardamos la info, aquí el primer parámetro 'lsFavCards' es el nombre que le damos a los datos, y luego ponemos los datos que queremos guardar, que tenemos que convertir a "String" mediante ".stringify" porque en LS solo se pueden guardar datos de tipo primitivo (número, string, booleano) y nosotros tenemos un array de objetos.

Para hacer lo contrario, en la función de GET, pasar a objeto, tenemos que usar ".parse".

▫ ▫ ▫ ▫

En la función getFromLocalStorage(); es crear una variable en la que guardar los datos de LS, y hacemos un condicional donde decimos, sin esa Lista es distinta de null, creo que podría ser:
if (lsFavCardsList) {};
Aquí le decimos que la variable let = disneyDataListFav serán esos datos que tenemos en LS, parseados, y volvemos a renderizar toda la lista FAV.
🔽
*/

const getFromLocalStorage = () => {
  const lsFavCardsList = localStorage.getItem('lsFavCards');
  if (lsFavCardsList) {
    disneyDataListFav = JSON.parse(lsFavCardsList);
    renderFavCardList ();
  }
};
getFromLocalStorage();


//FETCH
/* */

/* Con esta función obtenemos los datos de una API (Application Programming Interfaces
URL para consultar datos de un servicio), externa y los pintamos: renderAllCharacters(disneyDataList) */
const getApiData = () => {
  fetch(serverURL)
    .then((response) => response.json())
    .then((listData) => {
      console.log(listData);
      disneyDataList = listData.data;
      renderAllCharacters(disneyDataList);
    });
};
getApiData (); //tenemos que llamar a la función para que se ejecute.

// 5️⃣ ⏩️
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
/*
🔼
Antes de hacer el fetch creamos una variable para el valor del inputValue
Siguiendo las indicaciones de la documentación de la API de Disney, cogemos la URL indicada, que nos permite pedir info de muchas más persojajes, le añadimos el inputValue, a esa URL en el fetch, y pintamos de nuevo la lista de todos los personajes.
*/


// FUNCTIONS
// en esta función de renderOneCharacter tenemos 2 parámetros, el segundo es el que utilizaremos para saber si es Favorito.
/* 
function renderOneCharacter(disneyDataObj, isFav) {
  const elemIndex = disneyDataListFav.findIndex( (elem) => elem._id === disneyDataObj._id );
  //buscamos el elemento donde nos coincide el id, entre disneyDataListFav y disneyDataObj (que es el el primer parámetro de esta función). findIndex nos da la posición del primer elemento que coincide con eso.
  let elemClass = '' ;
  let btnDelete = '';
  //Partimos de unas variables que cambian, por eso las dejamos vacías.
  if (isFav) {
    btnDelete = '<div class="card__btn js_deleteFav"><button class="card__btn--x js_deleteFav-btn">x</button></div>';
  } else {
    elemClass = 'js_card ';
  }
  // Con este if else, hacemos dos cosas a la vez, añadir el botón, si se cumple el segundo parámetro de la función. 
  // 3️⃣ ⏩️
  if (elemIndex !== -1) {
    // elemIndex !== -1 esto significa que cuando findIndex nos devuelve algo, es decir, no es -1, pq nos devuelve -1 solo cuando no encuentra nada.
    // Entonces creamos una variable que nos permita identificar los personajes favoritos. Usando un += porque así podemos sumarle la clase anterior js_card.
    elemClass += 'card__fav';
  }
  if (disneyDataObj.imageUrl === undefined) {
    disneyDataObj.imageUrl = emptyURL;
  } // esto lo hacemos cuando la API no tiene imagen.
  let html = `<li id="${disneyDataObj._id}" class="card ${elemClass}">`;
  html += `${btnDelete}`;
  html += `<article class="character">`;
  html += `<img class="character__img js_img" src="${disneyDataObj.imageUrl}" alt="Disney Characters" />`;
  html += `<p class="character__name js_name">${disneyDataObj.name}</p>`;
  html += `</article>
            </li>`;
  return html;
}
*/

/*  Añadir elementos con DOM  */
function renderOneCharacter(disneyDataObj, isFav) {
  const elemIndex = disneyDataListFav.findIndex( (elem) => elem._id === disneyDataObj._id );
  if (disneyDataObj.imageUrl === undefined) {
    disneyDataObj.imageUrl = emptyURL;
  }
  const li = document.createElement('li');
  const art = document.createElement('article');
  const img = document.createElement('img');
  const para = document.createElement('p');
  const paraText = document.createTextNode(disneyDataObj.name);
  li.setAttribute('id', `${disneyDataObj._id}`);
  li.classList.add(`card`);
  art.classList.add('character');
  img.setAttribute('src', `${disneyDataObj.imageUrl}`);
  img.setAttribute('alt', `Disney Characters image: ${disneyDataObj.name}`);
  img.classList.add('character__img', 'js_img');
  para.classList.add('character__name', 'js_name');
  li.appendChild(art);
  art.appendChild(img);
  art.appendChild(para);
  para.appendChild(paraText);
  if (isFav) {
    const div = document.createElement('div');
    const btnDel = document.createElement('button');
    const btnDelTex = document.createTextNode('X');
    div.classList.add('card__btn','js_div', 'js_deleteFav');
    btnDel.classList.add('card__btn--x', 'js_deleteFav-btn');
    li.appendChild(div);
    div.appendChild(btnDel);
    btnDel.appendChild(btnDelTex);}
  else {
    li.classList.add('js_card');
  }
  if (elemIndex !== -1) {
    li.classList.add(`card__fav`);
  }
  return li;
}

function renderAllCharacters (list) {
  cardList.innerHTML = '';
  //cardList es nuestra lista en HTML, 
  for (const eachCharacter of list ) {
    cardList.appendChild(renderOneCharacter(eachCharacter));
  }
  addEventCards();
}

// 3️⃣ ⏩️
function addEventCards () {
  const cardElemList = document.querySelectorAll('.js_card');
  // Usamos querySelectorAAAAAALLLLL para tener un array de todas las que tienen esa clase, y añadirmos el evento, a cada uno de esos elementos con un bucle.
  for( const card of cardElemList ) {
    card.addEventListener ('click', handleFav);
  }
}

// 3️⃣ ⏩️
function renderFavCardList () {
  cardListFav.innerHTML = '';
  // disneyDataListFav es la variable que hemos creado para contener todos los favoritos.
  for ( const fav of disneyDataListFav) {
    cardListFav.appendChild(renderOneCharacter(fav, true));
    //tiene dos parámetros, cada elemento y aquí es donde le decimos que isFav(y), el segundo parámetro de renderOneCharacter( x, y) es true.
  }
  // 6️⃣ ⏩️
  const deleteFavBtn = document.querySelectorAll('.js_deleteFav');
  // Usamos querySelectorAAAAAALLLLL para tener un array de todas las tarjetas fav a las que queremos agregar el boton y en la que queremos escuchar el evento.
  for( const eachFav of deleteFavBtn ) {
    eachFav.addEventListener('click', handleDelete);
  }
  // 💫 He conseguido añadir que aparezca la sección o desaparezca 💫
  if (disneyDataListFav.length === 0) {
    sectionFav.classList.add('hidden');
  } else {
    sectionFav.classList.remove('hidden');
  }

}

function handleFav (ev) {
  event.preventDefault();
  const id = parseInt(ev.currentTarget.id);
  const selectedCard = disneyDataList.find((elem) => elem._id === id);
  const indexCard = disneyDataListFav.findIndex( (elem) => elem._id === id);
  if (indexCard === -1) {
    // indexCard === -1 esto significa no encuentra nada, entonces agregamos el elemento.
    disneyDataListFav.push(selectedCard);
  }
  else {
    disneyDataListFav.splice(indexCard, 1);
  }
  // Splice nos elimina el número de elementos, 1 en este caso, en la posición que le estamos diciendo indexCard.
  setInLocalStorage (); // Con esto le decimos que almacene en el Local Storage nuestros favoritos.
  renderFavCardList ();
  renderAllCharacters(disneyDataList); 
}

// 6️⃣ ⏩️
function handleReset (event) {
  event.preventDefault();
  disneyDataListFav = [];
  renderFavCardList ();
  localStorage.removeItem('lsFavCards');
  renderAllCharacters(disneyDataList);
}

// 6️⃣ ⏩️
function handleDelete (event) {
  const id = parseInt(event.currentTarget.id);
  const indexCard = disneyDataListFav.findIndex( (elem) => elem._id === id);
  disneyDataListFav.splice(indexCard, 1);
  renderFavCardList ();
  renderAllCharacters(disneyDataList);
  // esto es para que se cargasen bien las clases de favoritos, pq solo se cargaban al recargar la página, así volviendo a llamar a la función dentro de esot ya se recarga de nuevo toda la lista, sin que la tenga que actualizar el usuario. Aunque con el nuevo condicional parece que no hace falta....
}

// EVENTS
// 5️⃣ ⏩️
btnSearch.addEventListener('click', handleSearch);
// 6️⃣ ⏩️
resetBtn.addEventListener('click', handleReset);
