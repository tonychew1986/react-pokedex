
import { take, delay, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  RETRIEVE_SINGLE_POKEMON
} from 'containers/DetailPage/constants';

import {
  retrieveSinglePokemonSuccess,
  retrieveSinglePokemonFailure
} from 'containers/DetailPage/actions';

import {
  makeSelectListPage
} from 'containers/DetailPage/selectors';

import axios, * as others from 'axios';

// Individual exports for testing
export default function* detailPageSaga() {
  yield takeLatest(RETRIEVE_SINGLE_POKEMON, _retrieveSinglePokemon);
}

export function* _retrieveSinglePokemon(data) {
  console.log("_retrieveSinglePokemon", data['num']);

  let num = data['num'];

  // let farmInfo = yield select(makeSelectListPage());

  let pokemonData = yield call(pokemonApi, num);
  console.log('pokemonData', pokemonData)

  // yield delay(100000);
  // yield put(depositSuccess(assetNum, depositAmount, txHash, selectedTrancheValue));
  // yield put(updateLoadingScreen(["", ""]));
  if(pokemonData){
    yield put(retrieveSinglePokemonSuccess(pokemonData));
  } else {
    yield put(retrieveSinglePokemonFailure());
  }
}

async function pokemonApi(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num
  console.log("url", url);
  console.log("pokemonApi");
  let pokemonData = await axios.get(url).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    return ''

  });
  console.log('pokemonData', pokemonData)
  return pokemonData.data
}
