import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
