
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

  let listInfo = yield select(makeSelectListPage());
  let newPokemons = listInfo['newPokemons']
  let apiPokemonLastPageCount = listInfo['apiPokemonLastPageCount']
  let apiPokemonLastPageRemainder = listInfo['apiPokemonLastPageRemainder']
  console.log('newPokemons', newPokemons)
  console.log('apiPokemonLastPageCount', apiPokemonLastPageCount)
  console.log('apiPokemonLastPageRemainder', apiPokemonLastPageRemainder)

  let pokemonData = [];
  let pokemonDataCount = 0;
  let remainderOffsetOnNewPokemon = 20 - apiPokemonLastPageRemainder

  if(page < apiPokemonLastPageCount){
    // before last page
    console.log('before last page')
    let pokemonDataFull = yield call(pokemonApi, page);
    pokemonDataCount = pokemonDataFull.count;
    pokemonData = pokemonDataFull.results;
    console.log('pokemonData', pokemonData)

  }else if(page == apiPokemonLastPageCount){
    // at last page
    console.log('at last page')
    let pokemonDataFull = yield call(pokemonApi, page);
    pokemonDataCount = pokemonDataFull.count
    pokemonData = pokemonDataFull.results;
    console.log('pokemonData', pokemonData)
    let entriesToAdd = Math.min(remainderOffsetOnNewPokemon, newPokemons.length)

    for(var i=0; i<entriesToAdd; i++){
      console.log('newPokemons[i]', newPokemons[i])
      pokemonData.push({
        "name": newPokemons[i]['name'],
        "url": "https://customurl.com/" + newPokemons[i]['id'] + '/'
      })
    }

  }else if(page > apiPokemonLastPageCount){
    // more than last page
    console.log('more than last page')
    let entriesToAdd = Math.min(newPokemons.length - remainderOffsetOnNewPokemon, 20)
    console.log('entriesToAdd', entriesToAdd)
    pokemonDataCount = 0;

    for(var i=0; i<entriesToAdd; i++){
      let startingIndex = remainderOffsetOnNewPokemon + i
      console.log('startingIndex', startingIndex)
      console.log('newPokemons[startingIndex]', newPokemons[startingIndex])
      pokemonData.push({
        "name": newPokemons[startingIndex]['name'],
        "url": "https://customurl.com/" + newPokemons[startingIndex]['id'] + '/'
      })
    }
  }

  console.log('page', page)
  console.log('apiPokemonLastPageCount', apiPokemonLastPageCount)
  // yield delay(100000);
  // yield put(depositSuccess(assetNum, depositAmount, txHash, selectedTrancheValue));
  // yield put(updateLoadingScreen(["", ""]));
  yield put(retrievePokemonSuccess(page, pokemonData, pokemonDataCount));
}

async function pokemonApi(page) {
  let url = "https://pokeapi.co/api/v2/pokemon?offset=" + ((page - 1) * 20)
  let pokemonData = await axios.get(url)
  return pokemonData.data
}
