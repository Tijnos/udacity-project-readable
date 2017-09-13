import React, { Component } from 'react';
import Root from './components/Root';
import Post from './components/Post';
import PostForm from './components/PostForm';
import './App.css';
import { Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
        <div>
            <Route exact path="/" component={Root}/>
            <Route exact path="/:category" component={Root}/>
            <Route exact path="/:category/:post_id" component={Post}/>
            <Route path="/postForm/:post_id" component={PostForm}/>
        </div>
    );
  }
}

export default App;
