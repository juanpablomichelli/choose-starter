// bring chosen pokemons from local storage
let pokemonsId = new Array();
let storedPokemons = JSON.parse(localStorage.getItem('chosenPokemons'));
if(storedPokemons !== null){
    pokemonsId = storedPokemons;
}

// select bag counter
const counter = document.querySelector('.pokemon-count p');
counter.innerHTML = pokemonsId.length;

// create chosenPokemons array
let chosenPokemons = new Array();

// show chosen pokemons
const showChosenPokemons = async(pokemonsId) => {

    // select data-div 
    const dataDiv = document.querySelector('.pokemons-data');

    // create ul
    const ul = document.createElement('ul');

    // fetch chosen pokemons using their ID's located in pokemonsId array
    for (let i = 0; i < pokemonsId.length; i++) {
        const pokemon = await fetchChosenPokemon(pokemonsId[i])      
        chosenPokemons.push(pokemon); 
    }    

     renderChosenPokemons(chosenPokemons);
    /* chosenPokemons.map( pokemon => {

        const li = document.createElement('li');    
        li.innerHTML = `${pokemon.name}`;

        const removeButton = document.createElement('button');
        removeButton.innerHTML = "remove";
        // define how we'll delete pokemons
        removeButton.addEventListener("click",()=>{
            deletePokemon(pokemon.id);
            localStorage.setItem('chosenPokemons',JSON.stringify(pokemonsId));
            document.location.reload();
        })

        li.appendChild(removeButton);
        ul.appendChild(li);
    })

    // append ul to data-div
    dataDiv.appendChild(ul); */
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

// will receive pokemon id and delete it from pokemonsId array
const deletePokemon = (id) => {
    for (let i = 0; i < pokemonsId.length; i++) {
        if(pokemonsId[i] === id){
            pokemonsId.splice(i,1);            
        }
    }


}

showChosenPokemons(pokemonsId);

const renderChosenPokemons = (pokemons) => {
    //select container
    const cardContainerFlex = document.querySelector('.cards-container');
  
    //select card-template
    const cardTemplate = document.getElementById('template-card').content;
  
    //clone card-template for making changes and create fragments to append them  
    const clones = new Array();
    const fragments = new Array();
  
    for (let i = 0; i < chosenPokemons.length; i++) {
      const clone = cardTemplate.cloneNode(true);
      clones.push(clone);
      const fragment = document.createDocumentFragment();
      fragments.push(fragment);
    }
  
    //Modify cloned template ass wished
    for (let i = 0; i < chosenPokemons.length; i++) {    
      clones[i].querySelector('.name #name-h2').innerHTML = pokemons[i].name;
      clones[i].querySelector('.img-pokemon').setAttribute('src', pokemons[i].sprite)
      const cloneType = clones[i].querySelector('.type');
      cloneType.innerHTML = pokemons[i].type;
      const cloneCard = clones[i].querySelector('.card');
      clones[i].querySelector('.stats').innerHTML = `<h3>Hp: </h3><p>${pokemons[i].stats.hp}</p>
      <h3>Ataque: </h3><p>${pokemons[i].stats.attack}</p>
      <h3>Especial: </h3><p>${pokemons[i].stats.special}</p>
      <h3>Defensa: </h3><p>${pokemons[i].stats.defense}</p>`  
  
      // Select button and apply event
      const btnRemove = clones[i].querySelector('.btn-remove');
  
      btnRemove.addEventListener("click", ()=>{  
        deletePokemon(chosenPokemons[i].id);
        localStorage.setItem('chosenPokemons',JSON.stringify(pokemonsId));
        document.location.reload();
      })
      
      // add type class depending on pokemon type
      switch(pokemons[i].type){
        case 'fire': cloneCard.classList.add('fire');
        break;
        case 'water': cloneCard.classList.add('water');
        break;
        case 'grass': cloneCard.classList.add('grass');
        break;
        case 'bug': cloneCard.classList.add('bug');
        break;
        case 'dragon': cloneCard.classList.add('dragon');
        break;
        case 'electric': cloneCard.classList.add('electric');
        break;
        case 'fighting': cloneCard.classList.add('fighting');
        break;
        case 'flying': cloneCard.classList.add('flying');
        break;
        case 'ghost': cloneCard.classList.add('ghost');
        break;
        case 'ground': cloneCard.classList.add('ground');
        break;
        case 'ice': cloneCard.classList.add('ice');
        break;
        case 'normal': cloneCard.classList.add('normal');
        break;
        case 'poison': cloneCard.classList.add('poison');
        break;
        case 'psychic': cloneCard.classList.add('psychic');
        break;
        case 'rock': cloneCard.classList.add('rock');
        break;
      }
    }  
    
    //Append clone to fragment and fragment to container
    for (let i = 0; i < chosenPokemons.length; i++) {
      fragments[i].appendChild(clones[i])
      cardContainerFlex.appendChild(fragments[i])    
    }
  }