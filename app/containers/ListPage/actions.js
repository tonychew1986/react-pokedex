/*
 *
 * ListPage actions
 *
 */

import {
  RETRIEVE_POKEMON,
  RETRIEVE_POKEMON_SUCCESS
} from './constants';

export function retrievePokemon(page) {
  console.log('retrievePokemon page', page)
  return {
    type: RETRIEVE_POKEMON,
    page
  };
}

export function retrievePokemonSuccess(page, list) {
  return {
    type: RETRIEVE_POKEMON_SUCCESS,
    page,
    list
  };
}
