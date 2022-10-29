/*
 *
 * DetailPage actions
 *
 */

 import {
  RETRIEVE_SINGLE_POKEMON,
  RETRIEVE_SINGLE_POKEMON_SUCCESS,
  RETRIEVE_SINGLE_POKEMON_FAILURE
 } from './constants';

 export function retrieveSinglePokemon(num) {
  console.log('retrieveSinglePokemon page', num)
  return {
    type: RETRIEVE_SINGLE_POKEMON,
    num
  };
 }

 export function retrieveSinglePokemonSuccess(entry) {
  return {
    type: RETRIEVE_SINGLE_POKEMON_SUCCESS,
    entry
  };
 }

 export function retrieveSinglePokemonFailure() {
  return {
    type: RETRIEVE_SINGLE_POKEMON_FAILURE
  };
 }
