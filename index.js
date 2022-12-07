var quantidade = document.getElementById('quantidade');
var submit = document.getElementById('submit');

var loader = document.getElementById('loading');

function displayLoading(){
    loader.classList.add("display");
    setTimeout(()=>{
        loader.classList.remove("display");
    }, 5000)
}

function hideLoading(){
    loader.classList.remove("display");
}

submit.addEventListener('click', ()=>{
    pegaPokemons(quantidade.value);
})

pegaPokemons(0);
function pegaPokemons(quantidade){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allPokemon => {
        displayLoading();
        var pokemons = [];

        allPokemon.results.map((val) => {

            fetch(val.url)
                .then(response => response.json())
                .then(singlePokemon => {
                    pokemons.push({ nome: val.name, imagem: singlePokemon.sprites.front_default });

                    if(pokemons.length == quantidade){
                        // requisição finalizada
                        hideLoading();
                        var pokemonBoxes = document.querySelector('.pokemon-boxes');
                        pokemonBoxes.innerHTML = "";

                        pokemons.map((val)=>{ 
                            pokemonBoxes.innerHTML+=`
                            <div class="pokemon-box">
                                <img src="${val.imagem}" >
                                <p>${val.nome}</p>
                            </div><!--pokemon-box-->
                            `;
                        })
                    }
                })
        })

        pokemons.map((val) => {
            console.log(val.nome);
        })

    })
}