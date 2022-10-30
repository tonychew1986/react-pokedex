/**
 *
 * DetailPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useParams } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectDetailPage } from './selectors';
import { makeSelectListPage } from '../ListPage/selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Style from './Style';

import {
  retrieveSinglePokemon
} from './actions';

import {
  retrievePokemon
} from '../ListPage/actions';

export function DetailPage({
  detailPage,
  listPage,
  onRetrievePokemon,
  onRetrieveSinglePokemon
}) {
  useInjectReducer({ key: 'detailPage', reducer });
  useInjectSaga({ key: 'detailPage', saga });

  // let params = useParams();
  let pokemonPath = window.location.pathname.split('/')
  let pokemonId = pokemonPath[pokemonPath.length - 1]
  console.log('pokemonId', pokemonId)

  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(retrievePokemon());
    onRetrievePokemon(1)
    onRetrieveSinglePokemon(pokemonId)
  },[])

  let skills
  if (detailPage.pokemonAttributes.abilities) {
    skills = detailPage.pokemonAttributes.abilities.map(function(skill, i){
      return (
        <div key={i}>
          {!skill.is_hidden ? (
            <div>
              <strong>-{skill.ability.name}-</strong>
            </div>
          ) : (
            <div>
              {skill.ability.name}
            </div>
          )}
        </div>
      )
    })
  }

  let types
  if (detailPage.pokemonAttributes.types) {
    types = detailPage.pokemonAttributes.types.map(function(type, i){
      return (
        <div key={i}>
          <div>
            {type.type.name}
          </div>
        </div>
      )
    })
  }

  let totalPokemonCount = listPage.pokemonCount + listPage.newPokemons.length

  return (
    <Style>
      {detailPage.pokemonFound ? (
        <div>
          This is an existing pokemon
        </div>
      ) : (
        <>
          {pokemonId.substring(0, 1) == "n" ? (
            <div>
              This is a new pokemon
            </div>
          ) : (
            <>
              There is no pokemon with this id
            </>
          )}
        </>
      )}



      {!detailPage.loading && (
        <div>
          {detailPage.pokemonFound && (
            <div>
              {detailPage.pokemonAttributes.sprites ? (
                <div>
                  <div>
                    <img src={detailPage.pokemonAttributes.sprites.front_default} />
                  </div>
                  <div>
                    <img src={detailPage.pokemonAttributes.sprites.back_default} />
                  </div>
                </div>
              ) : (
                <div>
                  ...
                </div>
              )}
              <div className="attribute">
                <div className="subtitle">
                  Name:
                </div>
                <div>
                  {detailPage.pokemonAttributes.name}
                </div>
              </div>
              <div className="attribute">
                <div className="subtitle">
                  Height:
                </div>
                <div>
                  {detailPage.pokemonAttributes.height}
                </div>
              </div>
              <div className="attribute">
                <div className="subtitle">
                  Weight:
                </div>
                <div>
                  {detailPage.pokemonAttributes.weight}
                </div>
              </div>
              <div className="attribute">
                <div className="subtitle">
                  Skills:
                </div>
                {skills}
              </div>
              <div className="attribute">
                <div className="subtitle">
                  Types:
                </div>
                {types}
              </div>
            </div>
          )}
        </div>
      )}

      {(pokemonId > listPage.pokemonCount && pokemonId <= totalPokemonCount) && (
        <div>


          {!detailPage.loading && (
            <div>
                <div>
                  <div className="attribute">
                    <div className="subtitle">
                      Name:
                    </div>
                    <div>
                      {listPage.newPokemons[0].name}
                    </div>
                  </div>
                  <div className="attribute">
                    <div className="subtitle">
                      Height:
                    </div>
                    <div>
                      {listPage.newPokemons[0].height}
                    </div>
                  </div>
                  <div className="attribute">
                    <div className="subtitle">
                      Weight:
                    </div>
                    <div>
                      {listPage.newPokemons[0].weight}
                    </div>
                  </div>
                </div>
            </div>
          )}
        </div>
      )}

    </Style>
  );
}

DetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailPage: makeSelectDetailPage(),
  listPage: makeSelectListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRetrieveSinglePokemon: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(retrieveSinglePokemon(evt));
    },
    onRetrievePokemon: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(retrievePokemon(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DetailPage);
