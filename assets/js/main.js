const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadLessButton = document.getElementById("loadLessButton");
let limit = 1;
let offset = 0;
const maxRecord = 151;
let pokemonStates = [];


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `      
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <div class="adjustname">
                <span class="name">${pokemon.name}</span>
                </div>
                <div class="bgimg">
                <img class="img" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <div class="detail2">
                    <ol class="numerostatus">
                        ${pokemon.stat.map((stats) => `<li class="atributo">${stats}</li>`).join('')}
                    </ol>
                    <ol class="textostatus">
                        ${pokemon.status.map((status) => `<li class="numeros">${status}</li>`).join('')}
                    </ol>
                </div>
             
            </li>`


        ).join('');

        pokemonList.innerHTML = newHtml;
        pokemonStates.push(newHtml);
    });
}

loadPokemonItems(offset, limit);


loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const records = offset + limit;



    if (records >= maxRecord) {
        let newLimit = maxRecord - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);


    } else {
        loadPokemonItems(offset, limit);

    }
});



loadLessButton.addEventListener('click', () => {
    if (pokemonStates.length >= 1) {
        pokemonStates.pop();
        offset = Math.max(0, offset - limit);
        loadPokemonItems(offset, limit);
        loadLessButton.parentElement.appendChild(loadMoreButton);





    }
});
