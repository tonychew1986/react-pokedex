/**
 *
 * Navigation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Navigation() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Navigation.propTypes = {};

export default Navigation;
