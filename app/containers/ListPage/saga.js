
import { take, delay, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  RETRIEVE_POKEMON
} from 'containers/ListPage/constants';

import {
  retrievePokemonSuccess
} from 'containers/ListPage/actions';

import {
  makeSelectListPage
} from 'containers/ListPage/selectors';

import axios, * as others from 'axios';

// Individual exports for testing
export default function* listPageSaga() {
  yield takeLatest(RETRIEVE_POKEMON, _retrievePokemon);
}

export function* _retrievePokemon(data) {
  console.log("_retrievePokemon", data['page']);

  let page = data['page'];

  // let farmInfo = yield select(makeSelectListPage());

  let pokemonData = yield call(pokemonApi, page);
  console.log('pokemonData', pokemonData)

  // yield delay(100000);
  // yield put(depositSuccess(assetNum, depositAmount, txHash, selectedTrancheValue));
  // yield put(updateLoadingScreen(["", ""]));
  yield put(retrievePokemonSuccess(page, pokemonData));
}

async function pokemonApi(page) {
  let url = "https://pokeapi.co/api/v2/pokemon?offset=" + ((page - 1) * 20)
  let pokemonData = await axios.get(url)
  return pokemonData.data
}
