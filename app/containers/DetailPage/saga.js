
import { take, delay, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  RETRIEVE_POKEMON
} from 'containers/DetailPage/constants';

import {
  retrievePokemonSuccess
} from 'containers/DetailPage/actions';

import {
  makeSelectListPage
} from 'containers/DetailPage/selectors';

import axios, * as others from 'axios';

// Individual exports for testing
export default function* detailPageSaga() {
  yield takeLatest(RETRIEVE_POKEMON, _retrievePokemon);
}

export function* _retrievePokemon(data) {
  console.log("_retrievePokemon", data['num']);

  let num = data['num'];

  // let farmInfo = yield select(makeSelectListPage());

  let pokemonData = yield call(pokemonApi, num);
  console.log('pokemonData', pokemonData)

  // yield delay(100000);
  // yield put(depositSuccess(assetNum, depositAmount, txHash, selectedTrancheValue));
  // yield put(updateLoadingScreen(["", ""]));
  yield put(retrievePokemonSuccess(pokemonData));
}

async function pokemonApi(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num
  let pokemonData = await axios.get(url)
  return pokemonData.data
}
