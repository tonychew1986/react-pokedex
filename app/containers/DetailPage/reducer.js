/*
 *
 * DetailPage reducer
 *
 */
import produce from 'immer';
import {
  RETRIEVE_SINGLE_POKEMON,
  RETRIEVE_SINGLE_POKEMON_SUCCESS,
  RETRIEVE_SINGLE_POKEMON_FAILURE
} from './constants';

export const initialState = {
  loading: false,
  pokemonFound: true,
  pokemonEntryNum: 0,
  pokemonAttributes: []
};

/* eslint-disable default-case, no-param-reassign */
const detailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RETRIEVE_SINGLE_POKEMON:
        draft.loading = true;
        draft.pokemonEntryNum = action.num

        break;

      case RETRIEVE_SINGLE_POKEMON_SUCCESS:
        draft.loading = false;
        draft.pokemonAttributes = action.entry;
        draft.pokemonFound = true;

        break;

      case RETRIEVE_SINGLE_POKEMON_FAILURE:
        draft.loading = false;
        draft.pokemonFound = false;

        break;
    }
  });

export default detailPageReducer;
