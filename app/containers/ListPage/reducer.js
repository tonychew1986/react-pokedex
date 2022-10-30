/*
 *
 * ListPage reducer
 *
 */
import produce from 'immer';
import {
  ADD_POKEMON,
  RETRIEVE_POKEMON,
  RETRIEVE_POKEMON_SUCCESS,
  SET_PAGE,
  POPULATE_POKEMON
} from './constants';

export const initialState = {
  currentPage: 1,
  listLoading: false,
  pokemonCount: 0, //default, ending index for api based pokemon
  pokemonList: [], //default
  pokemonListTotal: [], //api + new
  pokemonCountTotal: 0, //api + new
  currentListPage: 0,
  newPokemons: [],
  apiPokemonLastPageCount: 999999,
  apiPokemonLastPageRemainder: 0
};

let pageObj = {}

/* eslint-disable default-case, no-param-reassign */
const listPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_POKEMON:
        console.log('action.data', action.data)
        let normalisedNewPokemonData = {
          "name": action.data.name,
          "url": "-"
        }

        return {
          ...state,
          newPokemons: [...state.newPokemons, action.data],
          pokemonListTotal: [...state.pokemonListTotal, normalisedNewPokemonData]
        }

        break;

      case RETRIEVE_POKEMON:
        draft.listLoading = true;

        break;

      case SET_PAGE:
        draft.currentPage = action.page;

        break;

      case POPULATE_POKEMON:
        let count = draft.newPokemons.length;
        console.log('draft.newPokemons', draft.newPokemons)
        
        let obj = {
            "id": "n-"+count,
            "name": "pokemon" + count,
            "abilities": count,
            "height": count,
            "weight": count,
            "moves": count,
            "order": "",
            "species": "",
            "sprites": "",
            "stats": ""
        }

        return {
          ...state,
          newPokemons: [...state.newPokemons, obj]
        }

        break;

      case RETRIEVE_POKEMON_SUCCESS:
        draft.listLoading = false;
        draft.currentListPage = action.page;
        console.log('action.count', action.count)

        let pCount;
        if (action.count > 0) {
          pCount = action.count
          draft.pokemonCount = action.count
        } else {
          pCount = draft.pokemonCount
        }
        console.log('pCount', pCount)

        draft.pokemonList = action.list;

        let apiPokemonLastPageCount = Math.ceil(pCount / 20)
        let apiPokemonLastPageRemainder = (pCount % 20)

        draft.apiPokemonLastPageCount = apiPokemonLastPageCount
        draft.apiPokemonLastPageRemainder = apiPokemonLastPageRemainder
        console.log("apiPokemonLastPageCount", apiPokemonLastPageCount)
        console.log("apiPokemonLastPageRemainder", apiPokemonLastPageRemainder)

        break;
    }
  });

export default listPageReducer;
