// objeto game
class Game {
  constructor() {
    this._initGame();

    setTimeout(() => {
      this._printInfos();
      console.log(this.pokemon);
    }, 1000);
  }

  _initGame() {
    this.pokemon = new Pokemon();
    this.user = new User();
  }

  _printInfos() {
    $("#pokemonId").text(this.pokemon.id);
    $("#pokemonName").text(this.pokemon.name);
    $("#pokemonTypes").text(this.pokemon.types.join(", "));
    $("#pokemonGeneration").text(this.pokemon.generation);
    $("#defaut").attr("src", this.pokemon.image);
  }
}

// objeto user
class User {
  constructor() {
    this.name = null;
    this.points = null;
  }
}

// objeto pokemon
class Pokemon {
  constructor() {
    this.id = null;
    this.types = [];
    this.generation = null;
    this.name = null;
    this.image = null;
    this._shiny = false;
    this._getRandomPokemon();
  }

  _getRandomPokemon() {
    let randomId = Math.floor(Math.random() * 1025) + 1;
    let apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    $.ajax({
      url: apiUrl,
      method: "GET",
      success: (data) => {
        this.id = data.id;
        this.types = data.types.map((type) => type.type.name);
        this.name = data.name;
        this._setGeneration(data.id);
        this._setShiny();
        this.image = () => {
          switch (this._shiny) {
            case true:
              return data.sprites.other["official-artwork"].front_shiny;
              break;
            case false:
              return data.sprites.other["official-artwork"].front_default;
              break;
          }
        };
      },
      error: (err) => {
        console.log("Error fetching Pokémon: ", err);
      },
    });
  }

  _setGeneration(pokemonId) {
    let generationRanges = [
      { minId: 1, maxId: 151, generation: "1ª" },
      { minId: 152, maxId: 251, generation: "2ª" },
      { minId: 252, maxId: 386, generation: "3ª" },
      { minId: 387, maxId: 493, generation: "4ª" },
      { minId: 494, maxId: 649, generation: "5ª" },
      { minId: 650, maxId: 721, generation: "6ª" },
      { minId: 722, maxId: 809, generation: "7ª" },
      { minId: 810, maxId: 905, generation: "8ª" },
      { minId: 906, maxId: 1025, generation: "9ª" },
    ];

    for (const range of generationRanges) {
      if (pokemonId >= range.minId && pokemonId <= range.maxId) {
        this.generation = range.generation;
        break;
      }
    }
  }

  _setShiny() {
    let randomNumber = Math.floor(Math.random() * 4096) + 1;
    if (randomNumber === 1) {
      this._shiny = true;
      console.log("sim ", randomNumber);
    } else {
      this._shiny = false;
      console.log("nao ", randomNumber);
    }
  }
}

$(document).ready(() => {
  $("#generatePokemon").click(() => {
    let game = new Game();
    console.log(game);
  });
});
