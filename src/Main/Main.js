import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import App from '../App';

const Main = props => (
  <BrowserRouter>
    <Route path="/" exact component={LandingPage}/>
    <Route path="/draw" component={App}/>
  </BrowserRouter>
);

export default Main;
