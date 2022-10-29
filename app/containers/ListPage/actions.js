/*
 *
 * ListPage actions
 *
 */

import {
  ADD_POKEMON,
  RETRIEVE_POKEMON,
  RETRIEVE_POKEMON_SUCCESS,
  SET_PAGE
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

export function retrievePokemonSuccess(page, list) {
  console.log('RETRIEVE_POKEMON_SUCCESS')
  return {
    type: RETRIEVE_POKEMON_SUCCESS,
    page,
    list
  };
}

export function setPage(page) {
  console.log('SET_PAGE')
  return {
    type: SET_PAGE,
    page
  };
}
