import React from "react";
import {Link} from 'react-router-dom';
import pokemonImg from '../../img/pokemonTitle2.png'
import styles from './Nav.module.css'

const Nav = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div><Link to='/about'>
                    <img src={pokemonImg} alt="img not found" className={styles.img} /> 
                    </Link>
                </div>
                <div>  
                    <Link to='/create'>
                        <button className={styles.btn}>Create a Pokemon</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
 
export default Nav;