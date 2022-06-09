// bring chosen pokemons from local storage
let pokemonsId = new Array();
let storedPokemons = JSON.parse(localStorage.getItem('chosenPokemons'));
if(storedPokemons !== null){
    pokemonsId = storedPokemons;
}

// spinner 
const spinner = document.querySelector('.spin');
const loading = (boolean) => {
  if(boolean) spinner.style.display = "block";
  else spinner.style.display = "none";
}

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
        loading(true)
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        
        // Create a Pokemon object with api's data
        const pokemon = {
            name: data.name,
            sprite: data.sprites.other["official-artwork"].front_default,
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
    finally{
      loading(false)
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

const renderChosenPokemons = (pokemons) => {
    //select container
    const cardContainerFlex = document.querySelector('.cards-container-chosen');
  
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
      clones[i].querySelector('.img-container-bg').style.backgroundImage = `url(${pokemons[i].sprite})`;
      const cloneType = clones[i].querySelector('.type');
      cloneType.innerHTML = pokemons[i].type;
      const cloneCard = clones[i].querySelector('.card-chosen');
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
        case 'fairy': cloneCard.classList.add('fairy');
        break;
      }
    }  
    
    //Append clone to fragment and fragment to container
    for (let i = 0; i < chosenPokemons.length; i++) {
      fragments[i].appendChild(clones[i])
      cardContainerFlex.appendChild(fragments[i])    
    }
}

// if there are no chosen pokemons, show a text saying bag is empty

if(pokemonsId.length === 0){
    const p = document.createElement('p');
    const missingno = document.createElement('img');
    const emptyBagContainer = document.createElement('div');
    const cardsContainer = document.querySelector('.cards-container');

    p.innerHTML = `The bag is empty :( </br> <a href="index.html">Time to choose some pokemons!</a>`;
    p.className = "empty-bag-text"
    emptyBagContainer.appendChild(p);

    missingno.setAttribute("src","https://www.latercera.com/resizer/MFg5ToGsCNsgrAQRvJ6CuEqJbOA=/800x0/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/LUOOHUM2OVEEXG7ZTRSNI6XWLY.png")
    missingno.className = "missingno";
    emptyBagContainer.appendChild(missingno);

    emptyBagContainer.className = "empty-bag-container";

    cardsContainer.appendChild(emptyBagContainer);


}

showChosenPokemons(pokemonsId);

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

// fade git logo

function fadein(element) {
    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 65);
}

const gitLogo = document.querySelector('.git-icon');
fadein(gitLogo)
setInterval(function(){
    fadein(gitLogo)
},7400)