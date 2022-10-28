/*
 *
 * DetailPage actions
 *
 */

 import {
  RETRIEVE_POKEMON,
  RETRIEVE_POKEMON_SUCCESS
 } from './constants';

 export function retrievePokemon(num) {
  console.log('retrievePokemon page', num)
  return {
    type: RETRIEVE_POKEMON,
    num
  };
 }

 export function retrievePokemonSuccess(entry) {
  return {
    type: RETRIEVE_POKEMON_SUCCESS,
    entry
  };
 }
