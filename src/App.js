import React, { Component } from 'react';
import Root from './components/Root';
import Category from './components/Category';
import Post from './components/Post';
import './App.css';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <div>
            <Route exact path="/" component={Root}/>
            <Route exact path="/:categoryPath" component={Category}/>
            <Route exact path="/:categoryPath/:postId" component={Post}/>
        </div>
    );
  }
}

export default App;
