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
import FormPage from 'containers/FormPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// import Navigation from '../../components/Navigation';
// import LoadingScreen from '../../components/LoadingScreen';

import GlobalStyle from '../../global-styles';
// <LoadingScreen />
// <Navigation />

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route exact path="/detail/:id" component={DetailPage} />
        <Route exact path="/form" component={FormPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
