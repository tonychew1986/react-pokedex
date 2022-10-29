/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import ListPage from 'containers/ListPage/Loadable';
import DetailPage from 'containers/DetailPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Navigation from '../../components/Navigation';
// import LoadingScreen from '../../components/LoadingScreen';

import GlobalStyle from '../../global-styles';

import Style from './Style';

export default function App() {
  return (
    <div>
      <Navigation />
      <Style>
        <Switch>
          <Route exact path="/" component={ListPage} />
          <Route path="/detail/:id" component={DetailPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Style>
      <GlobalStyle />
    </div>
  );
}
