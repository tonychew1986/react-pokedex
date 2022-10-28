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
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  retrievePokemon
} from './actions';

export function DetailPage({
  detailPage,
  onRetrievePokemon
}) {
  useInjectReducer({ key: 'detailPage', reducer });
  useInjectSaga({ key: 'detailPage', saga });

  // let params = useParams();
  // console.log('params', params)

  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(retrievePokemon());
    onRetrievePokemon(1)
  },[])

  return (
    <div>
      test
    </div>
  );
}

DetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailPage: makeSelectDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
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
