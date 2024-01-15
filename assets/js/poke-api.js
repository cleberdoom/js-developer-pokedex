
const pokeApi = {}

function convertPokemonDetailsToPokemonModel(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;
    pokemon.weight = pokeDetail.weight;
  
   
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((statuses) => statuses.stat.name)
    const stap = stats
    pokemon.stat = stap

    const valores = pokeDetail.stats.map((oia) => oia.base_stat)
    pokemon.status = valores

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonDetailsToPokemonModel)

}
pokeApi.getPokemons = (offset,limit) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) =>  response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

        // .catch((error) => console.error(error))
        .finally(() => console.log('Requisição concluida'))
    

}

    



// fetch(url)

//     .then(function (response) {
//         return response.json();
//     })

//     .then(function (jsonBody) {
//         console.log(jsonBody);
//     })

//     .catch(function (error) {
//         console.error(error);
//     })
//     .finally(function () {
//         console.log('Requisição concluida')
//     })
