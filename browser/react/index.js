import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Albums from './components/Albums';
import Album from './components/Album';
import Artists from './components/Artists';
import Artist from './components/Artist';
import Songs from './components/Songs';
import NotFound from './components/NotFound';
import {Router, Route, hashHistory, browserHistory, IndexRedirect} from 'react-router';

const RouterComponent = () => {
    return (<Router history={browserHistory}>
      <Route path="/" component={AppContainer} >
        <IndexRedirect to="/albums" />
        <Route path="/albums" component={Albums}></Route>
        <Route path="/albums/:albumId" component={Album}></Route>
        <Route path="/artists" component={Artists}></Route>
        <Route path="/artists/:artistId" component={Artist}>
          <Route path="albums" component={Albums}></Route>
          <Route path="songs" component={Songs}></Route>
        </Route>
        <Route path="*" component={NotFound}></Route>
      </Route>
      </Router>);
}

ReactDOM.render(
  <RouterComponent />,
  document.getElementById('app')
);
