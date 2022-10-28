/*
 *
 * ListPage reducer
 *
 */
import produce from 'immer';
import {
  RETRIEVE_POKEMON,
  RETRIEVE_POKEMON_SUCCESS
} from './constants';

export const initialState = {
  listLoading: false,
  pokemonCount: 0,
  pokemonList: [],
  currentListPage: 0
};

/* eslint-disable default-case, no-param-reassign */
const listPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RETRIEVE_POKEMON:
        draft.listLoading = true;

        break;

      case RETRIEVE_POKEMON_SUCCESS:
        draft.listLoading = false;
        draft.currentListPage = action.page;
        draft.pokemonCount = action.list.count;
        draft.pokemonList = action.list.results;

        break;
    }
  });

export default listPageReducer;
