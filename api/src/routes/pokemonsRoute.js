const express = require("express");
const { Pokemon, Type } = require("../db");
const { getAllPokemon, getDbInfo } = require("./functions");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allPokesName = await getAllPokemon();
  try {
    if (name) {
      let poke = allPokesName.filter(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      );
      poke.length
        ? res.status(200).send(poke)
        : res.status(404).send("Pokemon not found");
    } else {
      let pokemons = await getAllPokemon();
      return res.status(200).send(pokemons);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const allPokesId = await getAllPokemon();
  try {
    if (id) {
      let pokemonById = allPokesId.filter((e) => e.id == id);
      pokemonById.length
        ? res.status(200).send(pokemonById)
        : res.status(404).send("Pokemon not found");
    }
  } catch (e) {
    console.log(e);
  }
});

//https://pokeapi.co/api/v2/pokemon/1
//id mio busco bd sino endpint api
/* router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id.length > 5) {
    let pokemonById = await Pokemon.findAll({
      include: {
        model: Pokemon,
        attributes: [`id: ${id}`],
        through: {
          attributes: [],
        },
      },
    });
    pokemonById.length
      ? res.status(200).send(pokemonById)
      : res.status(404).send("Pokemon not found hola");
  } else {
    pokemonById = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemonById.length
      ? res.status(200).send(pokemonById)
      : res.status(404).send("Pokemon not found holayadios");
  }
}); */

router.post("/", async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, img, types } =
    req.body;
  try {
    if (name) {
      const allPoke = await getAllPokemon();
      const isPoke = allPoke.find((e) => e.name === name.toLowerCase());
      if (!isPoke) {
        const pokemon = await Pokemon.create({
          name,
          hp,
          attack,
          defense,
          speed,
          height,
          weight,
          img,
        });

        const typeDb = await Type.findAll({
          where: {
            name: types,
          },
        });
        await pokemon.addType(typeDb);
        return res.status(201).send("successfully created pokemon");
      }
      return res.status(404).send("Pokemon name already exist");
    }
    if (!name) return res.status(404).send("Pokemon name is obligatory");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
