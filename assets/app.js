// test

const mainContainer = document.querySelector('.content');
const loader = document.querySelector('.sk-circle');

setTimeout(() => {
    mainContainer.classList.remove('hide');
    loader.style.display = 'none';
    mainContainer.classList.add('show');
}, 1000)


const api = fetch('https://pokeapi.co/api/v2/pokemon?limit=8%20')
    .then(response => response.json())
    .then(pokemon => {
        const poke = pokemon.results.map((data, index) => ({
            name: data.name,
            id: index + 1,
            url: data.url,

            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
                1}.png`,
            // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${index + 1}.gif`
        }));


        let cards = '';
        poke.forEach(pokes => {
            cards += `
                <div class="col-lg-3 mb-3">
            <div class="card " >
            <img src="${pokes.image}" class="card-img-top" height="200"  >
            <div class="card-body">
              <h5 class="card-title">${pokes.name}</h5>
            
             <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#pokemonDetail" data-poke="${pokes.id}">Show Details</a>
            </div>
          </div>
          </div>`
        });

        const pokemonContainer = document.querySelector('.content-pokemon');
        const searchPokemonContainer = document.querySelector('.content-search-pokemon');
        searchPokemonContainer.style.display = 'none';

        pokemonContainer.innerHTML = cards;

        const pokeDetail = document.querySelectorAll('.modal-detail-button')
        pokeDetail.forEach(btnModal => {
            btnModal.addEventListener('click', function () {
                const idPoke = this.dataset.poke;
                console.log(idPoke)
                fetch(`https://pokeapi.co/api/v2/characteristic/${idPoke}`)
                    .then(response => response.json())
                    .then(detail => {
                        const pokemonDetail = detail.descriptions;
                        const memek = pokemonDetail[Object.keys(pokemonDetail)[Object.keys(pokemonDetail).length - 1]]
                        const getStatus = detail.highest_stat;
                        const possibleValue = detail.possible_values;





                        let card = `
                        <h3 class="text-center mb-3">Karakteristik </h3>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">Deskripsi :  ${memek.description}</li>
                        <li class="list-group-item">Kemampuan : ${getStatus.name.toUpperCase()} </li>
                        <li class="list-group-item">Possible Values  :${possibleValue} </li>
                        </ul>`;
                        const modalBody = document.querySelector('.modal-body');
                        modalBody.innerHTML = card;


                    })
            })
        })


    })

const searchBtnPokemon = document.querySelector('.search-button');
searchBtnPokemon.addEventListener('click', function () {
    const inputKeyword = document.querySelector('.input-keyword');
    fetch('https://pokeapi.co/api/v2/pokemon/' + inputKeyword.value)
        .then(response => response.json())
        .then(pokemon => {
            const pokemonContainer = document.querySelector('.content-pokemon');
            const searchPokemonContainer = document.querySelector('.content-search-pokemon');
            pokemonContainer.style.display = 'none';
            searchPokemonContainer.style.display = 'block'
            const keys = pokemon.abilities.map((data, index) => ({
                name: data.ability.name,
                link: data.ability.url,
                id: index,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`,

            }));





            let cards = '';
            keys.forEach(dildo => {
                cards += `<p>${dildo.name}</p>
                    <img src="${dildo.image}" alt="">
                `
            })

            searchPokemonContainer.innerHTML = cards;



        })
})





// console.log(api)

// Clean

// const fetchPokemon = async () => {
//     const url = `https://pokeapi.co/api/v2/pokemon?limit=6%20`;
//     const res = await fetch(url);
//     const data = await res.json();

//     const pokemon = data.results.map((index, id) => ({
//         name: data.name,
//         id: id + 1,
//         image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
//             1}.png`,
//     }));

//     displayPokemon(pokemon)

//     const displayPokemon = pokemon => {
//         const pokemonHTMLString = pokemon
//             .map(
//                 pokeman =>
//                     ` <li class="card"> <img class="card-image" src="${pokeman.image}"/> <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2> </a> </li> `
//             )
//             .join("");
//         pokedex.innerHTML = pokemonHTMLString;
//     };
// };

