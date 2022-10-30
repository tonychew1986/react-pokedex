/*
 *
 * ListPage actions
 *
 */

import {
  ADD_POKEMON,
  RETRIEVE_POKEMON,
  RETRIEVE_POKEMON_SUCCESS,
  SET_PAGE,
  POPULATE_POKEMON
} from './constants';

export function addPokemon(data) {
 console.log('addPokemon page', data)
 return {
   type: ADD_POKEMON,
   data
 };
}

export function retrievePokemon(page) {
  console.log('retrievePokemon page', page)
  return {
    type: RETRIEVE_POKEMON,
    page
  };
}

export function retrievePokemonSuccess(page, list, count) {
  console.log('RETRIEVE_POKEMON_SUCCESS', count)
  return {
    type: RETRIEVE_POKEMON_SUCCESS,
    page,
    list,
    count
  };
}

export function setPage(page) {
  console.log('SET_PAGE')
  return {
    type: SET_PAGE,
    page
  };
}

export function populatePokemon() {
  console.log('POPULATE_POKEMON')
  return {
    type: POPULATE_POKEMON
  };
}
