const axios = require("axios");
const { Pokemon, Type } = require("../db");

//consigo los 40 pokemons incluyendo imagenes para su tipo determinado
const getApiInfo = async () => {
  try {
    let url = "https://pokeapi.co/api/v2/pokemon/";
    let pokemones = [];
    do {
      let info = await axios.get(url);
      let pokemonesApi = info.data;
      let auxPokemones = pokemonesApi.results.map((e) => {
        return {
          name: e.name,
          url: e.url,
        };
      });
      pokemones.push(...auxPokemones);
      url = pokemonesApi.next;
    } while (url != null && pokemones.length < 40);
    let pokesWithData = await Promise.all(
      pokemones.map(async (e) => {
        let pokemon = await axios.get(e.url);
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          img: pokemon.data.sprites.other.home.front_default,
          types: pokemon.data.types.map((e) => {
            return {
              name: e.type.name,
              img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
            };
          }),
          hp: pokemon.data.stats[0].base_stat,
          attack: pokemon.data.stats[1].base_stat,
          defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[5].base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
        };
      })
    );
    return pokesWithData;
  } catch (e) {
    console.log(e);
  }
};

//TRAIGO AL POKEMON ESPECIFICADO POR PARAMS (ID) / O POR QUERY (NAME) DESDE LA API CON TODOS SUS DATOS NECESARIO PARA LA RUTA DE DETALLE.
const getPokemonDetail = async (arg) => {
  try {
    const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}`);
    const data = await apiData.data;
    const pokemonData = {
      id: data.id,
      name: data.name,
      img: data.sprites.other.home.front_default,
      types: data.types.map((e) => {
        return {
          name: e.type.name,
          img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
        };
      }),
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
    };
    return pokemonData;
  } catch (e) {
    console.log(e);
  }
};

//TRAIGO TODOS LOS POKEMONES CREADOS DESDE LA BASE DE DATOS EN LA TABLA POKEMON, Y QUE INCLUYA LA TABLA TYPE CON SUS ATRIBUTOS NAME & IMG.
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name", "img"],
      through: {
        attributes: [],
      },
    },
  });
};

//UNO TODOS LOS POKEMONES, TANTO DE LA API COMO DE LA DB EN ALLPOKEMON.
const getAllPokemon = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allPokemon = apiInfo.concat(dbInfo);
  return allPokemon;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllPokemon,
  getPokemonDetail,
};
