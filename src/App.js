import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import Main from './components/Main';
import TenderCard from './components/TenderCard';

import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Main} />

          <Route path="/card/" component={TenderCard} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
