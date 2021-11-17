const pokeName = document.querySelector("#poke-name");
const pokeImg = document.querySelector("#poke-img");
const pokeInfoContainer = document.querySelector("#poke-info-container");
const pokeId = document.querySelector("#poke-id");
const pokeTypes = document.querySelector("#poke-types");
const pokeStats = document.querySelector("#poke-stats");
const pokemons = document.querySelector(".pokemons");

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = (event) => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    console.log(event.target.pokemon);
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then((data) => data.json())
        .then((response) => renderPokemonData(response))
        .catch((err) => renderNotFound());
};

const renderPokemonData = data => {
    showInfo(true);
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    pokeName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `linear-gradient(${colorTwo}, ${colorOne})`;
    // pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    let characteristicsHtml = '';
    for (let stat of stats) {
        console.log(stat);
        characteristicsHtml += `
        <div>
            ${stat.stat.name} :  ${stat.base_stat}
        </div>
        `;
    }
    pokeStats.innerHTML = characteristicsHtml;
}

const renderNotFound = () => {
    showInfo(false);
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', '../src/img/poke-shadow.svg');
    pokeImg.style.background = '';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}

const showInfo = (isShow) => {
    if (isShow) {
        pokeInfoContainer.classList.remove('poke-info-hidden');
    } else {
        pokeInfoContainer.classList.add('poke-info-hidden');
    }
}
let arrayRandomPokemon = [];

const searchRandomPokemon = (value) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
        .then((data) => data.json())
        .then((response) => cargarDatos(response.name, response.sprites.front_default))
        .catch((err) => renderNotFound());

}

const cargarDatos = (name, image) => {
  arrayRandomPokemon.push({name, image});
  if(arrayRandomPokemon.length == 4){
    let pokemonList = "";
    for(let i = 0; i<arrayRandomPokemon.length; i++){
      console.log(arrayRandomPokemon[i]); 

      pokemonList += `
      <div>
          <img src="${arrayRandomPokemon[i].image}" alt="${arrayRandomPokemon[i].name}">
          <p>${arrayRandomPokemon[i].name}</p>
      </div>
      `;
    }
    pokemons.innerHTML=pokemonList;
  }
}

const randomPokemon = () => {
    let max = 898;
    let min = 1;
    for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * (max - min) + min);
        searchRandomPokemon(random);
    }
}


window.addEventListener("load", () => {
    pokeName.textContent = 'What is this Pokemon?';
    showInfo(false);
    randomPokemon();
    renderRandomPokemon();
})