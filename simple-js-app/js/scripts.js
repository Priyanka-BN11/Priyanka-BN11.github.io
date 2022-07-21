//Array in variable pokemonRepository(in IIFE) 
let pokemonRepository = (function () {
let pokemonList =[ ];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
// let button = document.createElement('button');
function add(pokemon){
   if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
}
function getAll(){
    return pokemonList;
}
function imageDisplay(){
  //creating a image element
  let img = new Image();
  img.src = "https://img.captain-droid.com/wp-content/uploads/2017/04/pokemonwallpaper-icon.png.webp";
  let imageElement = document.querySelector('#Image');
  let pokemonList = document.querySelector('.pokemon-list');
  pokemonList.before(img); 
}
function addListItem(pokemons) {
    let ul = document.querySelector('.pokemon-list');
    //creating a list element
    let listItem = document.createElement('li');
    //creating a button element
    let button = document.createElement('button');
    button.innerText = pokemons.name;
    //adding classname to button
    button.classList.add('button', 'btn', 'btn-primary');
    //adding an attributes to the button 
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    //adding class to listItem 
    listItem.classList.add('group-list-item','list-inline');  
    //appendng button to listItem
    listItem.appendChild(button);
    //appending listitem to ul
    ul.appendChild(listItem);
    //adding eventlistener for button click
    button.addEventListener('click', function(event){
    event.preventDefault();
    showDetails(pokemons);
  });
  }
  function loadList(){
    return fetch(apiUrl).then(function(response)
    {
        return response.json();
    }).then(function (json){
        json.results.forEach(function (item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            //console.log(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}
function loadDetails(pokemon){
 let url = pokemon.detailsUrl;
 return fetch(url).then(function (response){
    return response.json();
}).then(function (details){
     pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types.map((type) => type.type.name).join(',');
    }).catch(function (e) {
      console.error(e);
    });
}
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
    // console.log(pokemon);
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();
 
    let img = new Image();
    img.src = pokemon.imageUrl;
    let pokemonname= document.createElement('h1');
    pokemonname.innerHTML= `<h1>Name:${pokemon.name}<h1>`;
    let pokemonheight = document.createElement('h4');
    pokemonheight.innerHTML= `<h4>Height:${pokemon.height}</h4>`;
    let pokemonweight = document.createElement('h2');
    pokemonweight.innerHTML= `<h4>Weight:${pokemon.weight} </h4>`;
    let pokemontypes = document.createElement('h2');
    pokemontypes.innerHTML = `<h4>Types:${pokemon.types}</h4>`;
    //appending elements to modal(body,title)
    modalBody.append(img);
    modalBody.append(pokemonheight);
    modalBody.append(pokemonweight);
    modalBody.append(pokemontypes);
    modalTitle.append(pokemonname);
    });
  }
return {
    add: add,
    getAll : getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    imageDisplay: imageDisplay
};
})();
//Printing the pokemon names and there height using forEach loop
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemons){
    //on pokemon name Button clicks displays pokemons details
    pokemonRepository.addListItem(pokemons);
    }); 
});
pokemonRepository.imageDisplay();


