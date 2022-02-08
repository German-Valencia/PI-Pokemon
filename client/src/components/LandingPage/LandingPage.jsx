import React from "react";
import { Link } from "react-router-dom";
import pokemonImg from "../../img/pokemonTitle.png";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.bg}>
      <img src={pokemonImg} alt="img not found" className={styles.image} />
      <h2 className={styles.author}><i>by... Gav</i></h2>
      <Link to="/home">
        <button className={styles.buttonIng}><i>Let's go!</i></button>
      </Link>
    </div>
  );
}
