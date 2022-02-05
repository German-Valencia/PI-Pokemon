import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1); // página actual que inicia en 1
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12); //pokemons por página el redme pide 12
  const indexOfLastPokemon = currentPage * pokemonsPerPage; //6 índice del último pokemon es la página actual por la cantidad de pokemones por página
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //0 indice del primer pokemon es igual al indice del ultimo pokemon menos los pokemones por pagina (12)
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  ); //guarda todos los pokemones que se tienen en cada página

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.prevenDefault();
    dispatch(getPokemons());
  }

  return (
    <div>
      <Link to="/pokemon">Create Pokemon</Link>
      <h1>POKEMON IS THE BEST</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all Pokemons
      </button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="fuasc">Fuerza Ascendente</option>
          <option value="fudesc">Fuerza Descendente</option>
        </select>
        <select>
          <option value="All">Todos</option>
          <option value="Created">Creados</option>
          <option value="apí">Existentes</option>
        </select>
        <select>
          <option value="Type">Tipo</option>
        </select>
        <Paginado
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
        {currentPokemons?.map((el) => {
          return (
            <div key={el.id}>
              <Link to={"/home/" + el.id}>
                <Card
                  name={el.name}
                  image={el.img}
                  types={
                    el.types &&
                    el.types.map((p) => (
                      <li key={"key" + p.name}>
                        <div>{p.name}</div>
                      </li>
                    ))
                  }
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
