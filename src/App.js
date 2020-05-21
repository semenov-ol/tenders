import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import TenderCard from './components/TenderCard';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Main} />
      <Route path="/card" component={TenderCard} />
    </div>
  );
}

export default App;
