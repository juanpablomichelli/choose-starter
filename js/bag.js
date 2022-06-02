// bring chosen pokemons from local storage
let pokemonsId = new Array();
let storedPokemons = JSON.parse(localStorage.getItem('chosenPokemons'));
if(storedPokemons !== null){
  pokemonsId = storedPokemons;
}

// create chosenPokemons array
let chosenPokemons = new Array();

// show chosen pokemons
const showChosenPokemons = (pokemonsId) => {

    // select data-div 
    const dataDiv = document.querySelector('.pokemons-data');

    // create ul and li
    const ul = document.createElement('ul');
    const li = document.createElement('li');    

    // fetch chosen pokemons using their ID's located in pokemonsId array
    pokemonsId.forEach(id => {
        fetchChosenPokemons(id)
    });
   
    
    

     // map chosen pokemons to li and append to ul
     /* chosenPokemons.map(pokemon=>{
        li.innerHTML = `${pokemon.name}`;
        ul.appendChild(li);
    }) */


    // here it logs
    console.log(chosenPokemons)
    
    // here it doesnt log
    // console.log(chosenPokemons[0])
    
    // ul.appendChild(li);

    // append ul to data-div
    dataDiv.appendChild(ul);
} 

const fetchChosenPokemon = async(id) => {

    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        
        // Create a Pokemon object with api's data
        const pokemon = {
            name: data.name,
            sprite: data.sprites.front_default,
            type: data.types[0].type.name,
            id: data.id,
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                special: data.stats[3].base_stat,
                defense: data.stats[2].base_stat
            }
        }

        return pokemon;
    }
    catch(error){
        console.log(error); 
    } 

}

showChosenPokemons(pokemonsId);
