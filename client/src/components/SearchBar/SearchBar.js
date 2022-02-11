import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, cleanPokemons } from "../../actions";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cleanPokemons(dispatch));
    dispatch(getPokemonByName(name));
    setName("");
  };

  return (
    <div className={styles.search}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Poke name..."
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={name}
          className={styles.input}
        />
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
