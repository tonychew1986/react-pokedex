/**
 *
 * Navigation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  Link,
} from 'react-router-dom';

import Style from './Style';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Navigation() {
  return (
    <Style>
      <Link to="/">
        <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" height="40px" />
      </Link>
    </Style>
  );
}

Navigation.propTypes = {};

export default Navigation;
