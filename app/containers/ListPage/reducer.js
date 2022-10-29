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
  SET_PAGE
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
  newPokemonsCount: 0,
  fullPokemonListObj: {}
};

// {
//   "1": {
//     "1": {},
//     "2": {},
//     ...
//   },
//   "2": {
//     "11": {},
//     "12": {},
//     ...
//   }
// }

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

        // pageObj = {}
        // let keyName = draft.pokemonCount + draft.newPokemonsCount + 1
        // console.log("keyName", keyName);
        // let pokemonObj = {}
        // pokemonObj['name'] = action.data.name
        // pokemonObj['url'] = '-'
        // // console.log("action.list.results", action.list.results);
        //
        // pageObj[keyName] = pokemonObj;
        // console.log("pageObj", pageObj);
        // draft.fullPokemonListObj[keyName] = pokemonObj;
        //
        // console.log("draft.fullPokemonListObj", draft.fullPokemonListObj);
        //
        return {
          ...state,
          newPokemons: [...state.newPokemons, action.data],
          pokemonListTotal: [...state.pokemonListTotal, normalisedNewPokemonData],
          // fullPokemonListObj: {
          //   ...state.categories,
          //   Professional: {
          //     ...state.categories.Professional,
          //     active: true
          //   }
          // }
        }

        break;

      case RETRIEVE_POKEMON:
        draft.listLoading = true;

        break;

      case SET_PAGE:
        draft.currentPage = action.page;

        break;


      case RETRIEVE_POKEMON_SUCCESS:
        draft.listLoading = false;
        draft.currentListPage = action.page;
        draft.pokemonCount = action.list.count;
        draft.pokemonList = action.list.results;

        console.log('RETRIEVE_POKEMON_SUCCESS')

        // pageObj = {}
        // for (var i=0; i<action.list.results.length; i++) {
        //   let keyName = ((action.page - 1) * 20) + i + 1
        //   console.log("keyName", keyName);
        //   let pokemonObj = {}
        //   pokemonObj['name'] = action.list.results[i]['name']
        //   pokemonObj['url'] = action.list.results[i]['url']
        //   // console.log("action.list.results", action.list.results);
        //
        //   pageObj[keyName] = pokemonObj;
        //   draft.fullPokemonListObj[keyName] = pokemonObj;
        // }
        //
        // console.log("action.list.results", action.list.results);
        // console.log("pageObj", pageObj);
        // console.log("draft.fullPokemonListObj", draft.fullPokemonListObj);
        // draft.pokemonList = pageObj;

        // return {
        //   ...state,
        //   fullPokemonListObj: [...state.fullPokemonListObj, ...pageObj]
        // }
        // return {
        //   ...state,
        //   fullPokemonListObj: pageObj
        // }

        // let pageObj = {
        //   action.page: {
        //     "1": {},
        //     "2": {},
        //     ...
        //   },
        // }

        break;
    }
  });

export default listPageReducer;
