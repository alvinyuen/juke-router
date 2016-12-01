import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Albums from './components/Albums';
import Album from './components/Album';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';

const RouterComponent = () => {
    return (<Router history={hashHistory}>
      <Route path="/" component={AppContainer} >
        <IndexRedirect to="/albums" />
        <Route path="/albums" component={Albums}></Route>
        <Route path="/albums/:albumId" component={Album}></Route>
      </Route>
      </Router>);

}

ReactDOM.render(
  <RouterComponent />,
  document.getElementById('app')
);
