/*
 *
 * DetailPage reducer
 *
 */
import produce from 'immer';
import {
  RETRIEVE_POKEMON,
  RETRIEVE_POKEMON_SUCCESS
} from './constants';

export const initialState = {
  loading: false,
  pokemonEntryNum: 0,
  pokemonAttributes: []
};

/* eslint-disable default-case, no-param-reassign */
const detailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RETRIEVE_POKEMON:
        draft.loading = true;
        draft.pokemonEntryNum = action.num

        break;

      case RETRIEVE_POKEMON_SUCCESS:
        draft.loading = false;
        draft.pokemonAttributes = action.entry;

        break;
    }
  });

export default detailPageReducer;
