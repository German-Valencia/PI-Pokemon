import React from "react";

export default function Card({ name, image, types, id }) {
  return (
    <div>
      <h3>Nombre: {name}</h3>
      <h5>Tipo: {types}</h5>
      <img src={image} alt="img not found" width="200px" height="250px" />
      <h3>{id}</h3>
    </div>
  );
}
