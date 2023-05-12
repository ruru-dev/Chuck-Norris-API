// require('dotenv').config() 

const fetchPokemonData = (pokemonName)=> {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`) //Perform a fetch to the API. (Javascript returns a promise for us.)
  //Once the fetch is complete and the first promise is resolved, check if there was an error and then parse the JSON data.
  .then(response => {
    if(!response.ok) {
      throw Error(response.statusText)
    } 
    return response.json(); //Parse the JSON data (Javascript returns a promise for us).
  })
  //If at any point in this entire chain we encounter an error, handle it here.
  .catch( //callback function. .catch is the higher order  function.
  //The anonymous function is the callback function.
    err => console.log(`Error,  ${err}`)
  );
}

/*
 * Fetch the data for 2 Pokemon to battle.
 *
 * The fetchPokemonData function will return a Promise while we wait for the Pokemon API's response.
 */
let fetchPokemon1 = fetchPokemonData('pikachu');
let fetchPokemon2 = fetchPokemonData('eevee');

/*
 * Wait until all the fetches are complete and the Promises are resolved.
 * 
 * We need the fetched data from the Pokemon API before making the Pokemon battle.
 */
Promise.all([fetchPokemon1, fetchPokemon2]).then((pokemonData) => {
  // Get the fetched data for Pokemon 1 and update the placeholder
  const pokemonData1 = pokemonData[0];
  const pokemonImageUrl1 = pokemonData1.sprites.back_default;
  const pokemonName1 = pokemonData1.name.toUpperCase();
  document.getElementById(`pokemon-0-image`).src = pokemonImageUrl1;
  document.getElementById(`pokemon-0-name`).innerText = pokemonName1;

  // Get the fetched data for Pokemon 2 and update the placeholder
  const pokemonData2 = pokemonData[1];
  let pokemonImageUrl2 = pokemonData2.sprites.front_default;
  let pokemonName2 = pokemonData2.name.toUpperCase();
  document.getElementById(`pokemon-1-image`).src = pokemonImageUrl2;
  document.getElementById(`pokemon-1-name`).innerText = pokemonName2;

  pokemonBattle(pokemonData1, pokemonData2);
});

const pokemonBattle = (pokemon1, pokemon2) => {
  let baseExperiencePokemon1 = pokemon1.base_experience;
  let baseExperiencePokemon2 = pokemon2.base_experience;

  if (baseExperiencePokemon1 > baseExperiencePokemon2) {
    document.getElementById('pokemon-0').classList.add('victor')
  }
  else {
    document.getElementById('pokemon-1').classList.add('victor')
  }
}