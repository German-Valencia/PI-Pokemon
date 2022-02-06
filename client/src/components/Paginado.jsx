import React from "react";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className="number">
              <a href="x" onClick={() => paginado(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
