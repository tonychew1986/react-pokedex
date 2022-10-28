/**
 *
 * LoadingScreen
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LoadingScreen() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

LoadingScreen.propTypes = {};

export default LoadingScreen;
