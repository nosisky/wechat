import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import ChatPage from '../components/pages/ChatPage';
import Authentication from '../components/includes/Authentication';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Authentication(HomePage)} />
      <Route path="/chat/:id?" component={ChatPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
