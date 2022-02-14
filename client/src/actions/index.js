import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_NAME = "ORDER_NAME";
export const FILTER_TYPE = "FILTER_TYPE";
export const ORDER_STR = "FILTER_STR";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_POKEMONS = "CLEAN_POKEMONS";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      let json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};


/* export const getPokemons = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/pokemons")
      .then((json) => json.data)
      .then((json) => dispatch({ type: GET_POKEMONS, payload: json }))
      .catch((e) => console.log(e));
  };
}; */

export const cleanPokemons = (dispatch) => {
  return dispatch({
    type: CLEAN_POKEMONS,
    payload: [],
  });
};

export const getAlltypes = () => {
  return async (dispatch) => {
    try {
      let json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_ALL_TYPES,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/* export const getAlltypes = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/types")
      .then((json) => json.data)
      .then((json) => dispatch({ type: GET_ALL_TYPES, payload: json }))
      .catch((e) => console.log(e));
  };
}; */

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const orderName = (payload) => {
  return {
    type: ORDER_NAME,
    payload,
  };
};

export const filterType = (payload) => {
  return {
    type: FILTER_TYPE,
    payload,
  };
};

export const filterStr = (payload) => {
  return {
    type: ORDER_STR,
    payload,
  };
};

export const getPokemonByName = (payload) => {
  return async (dispatch) => {
    try {
      var json = await axios.get(
        `http://localhost:3001/pokemons?name=${payload}`
      );
      return dispatch({
        type: GET_POKEMON_NAME,
        payload: json.data,
      });
    } catch (e) {
      alert("Pokemon not found");
      window.location.href = "http://localhost:3000/home";
      console.log(e);
    }
  };
};

/* export const getPokemonByName = (payload) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/pokemons?name=${payload}`)
      .then((json) => json.data)
      .then((json) => dispatch({ type: GET_POKEMON_NAME, payload: json }))
      .catch((e) => {
        alert("Pokemon not found");
        window.location.href = "http://localhost:3000/home";
        console.log(e);
      });
  };
}; */

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

/* export const getDetail = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/pokemons/${id}`)
      .then((json) => json.data)
      .then((json) => dispatch({ type: GET_DETAILS, payload: json }))
      .catch((err) => console.log(err));
  };
}; */

export const cleanDetail = (dispatch) => {
  return dispatch({
    type: CLEAN_DETAIL,
    payload: [],
  });
};

export const postPokemon = (payload) => {
  return async () => {
    try {
      var createPoke = await axios.post(
        "http://localhost:3001/pokemons",
        payload
      );
      alert("New pokemón is created!");
      return createPoke;
    } catch (e) {
      alert("Pokemon name already exist");
      console.log(e);
    }
  };
};

/* export const postPokemon = (payload) => {
  return () => {
let createPoke = axios.post("http://localhost:3001/pokemons", payload);
alert("New pokemón is created!");
return createPoke;   
  };
}; */
