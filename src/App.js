import React, { Component } from 'react';
import Root from './components/Root';
import './App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div>
            <Route exact path="/" component={Root}/>
            <Route path="/category" component={Category}/>
        </div>
    );
  }
}

export default App;
