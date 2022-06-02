// Number of CARDS that will be rendered
const CARDS = 3;

// Make an array of chosen pokemons or grab it from localStorage
let pokemonsId = new Array();

// select bag counter
const counter = document.querySelector('.pokemon-count p');

// Function taken from MDN to generate a random int between two values
const getRandomInt = (min, max) => {
    return Math.floor((Math.random()*(max-min)) + min);
}

// Wait till DOM is loaded to fetch random pokemons
document.addEventListener('DOMContentLoaded',()=>{
    // fetch and paint pokemons creating random ints
    const randoms = new Array();
    for (let i = 0; i < CARDS; i++) {
      randoms.push(getRandomInt(1,151));
    }
    fetchPokemons(randoms);

    // bring chosen pokemons
    let storedPokemons = JSON.parse(localStorage.getItem('chosenPokemons')); 

    if(storedPokemons !== null){
      pokemonsId = storedPokemons;
    }

    counter.innerHTML = pokemonsId.length;

})

const fetchPokemons = async(randoms) => {
    try{
        //create pokemon array
        const pokemons = new Array();

        // fetch pokemons
        for (let i = 0; i < CARDS; i++) {
            
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randoms[i]}`);
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

            // add pokemon to pokemon array
            pokemons.push(pokemon);
        }       

        renderPokemons(pokemons);
    }
    catch(error){
        console.log(error)
    }
}

const renderPokemons = (pokemons) => {
  //select container
  const cardContainerFlex = document.querySelector('.cards-container');

  //select card-template
  const cardTemplate = document.getElementById('template-card').content;

  //clone card-template for making changes and create fragments to append them  
  const clones = new Array();
  const fragments = new Array();

  for (let i = 0; i < CARDS; i++) {
    const clone = cardTemplate.cloneNode(true);
    clones.push(clone);
    const fragment = document.createDocumentFragment();
    fragments.push(fragment);
  }

  //Modify cloned template ass wished
  for (let i = 0; i < CARDS; i++) {    
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
    const btnChoose = clones[i].querySelector('.btn-choose');

    btnChoose.addEventListener("click", ()=>{

      if(pokemonsId.length < 6){
        // agregar pokemon id a array pokemones
        pokemonsId.push(pokemons[i].id)
        localStorage.setItem('chosenPokemons',JSON.stringify(pokemonsId));
        counter.innerHTML = pokemonsId.length;
  
        // reload page
        document.location.reload();
      }
      else alert("No se pueden agregar mas pokemones");
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
  for (let i = 0; i < CARDS; i++) {
    fragments[i].appendChild(clones[i])
    cardContainerFlex.appendChild(fragments[i])    
  }
}



// text animation
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 800
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 6000
  });



  
 



  