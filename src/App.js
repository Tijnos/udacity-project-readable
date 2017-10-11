import {setCategories, setPosts, addComments, getPosts, getCategories, getComments} from './actions/index'
import React, {Component} from 'react';
import Root from './components/Root';
import Post from './components/Post';
import PostForm from './components/PostFormModal';
import './App.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {

    componentDidMount() {
        this.props.getPosts((posts) => {
            posts.forEach((post) => {
                this.props.getComments(post.id);
            });
        });
        this.props.getCategories();
    }

    render() {
        return (
            <div>
                <h1>Readable</h1>

                <Route exact path="/" component={Root}/>
                <Route exact path="/:category" component={Root}/>
                <Route exact path="/:category/:post_id" component={Post}/>
                <Route path="/postForm/:post_id" component={PostForm}/>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getPosts: (afterFetch) => dispatch(getPosts(afterFetch)),
        getCategories: () => dispatch(getCategories()),
        getComments: (postId) => dispatch(getComments(postId)),
        setCategories: (categories) => dispatch(setCategories(categories)),
        setPosts: (posts) => dispatch(setPosts(posts)),
        addComments: (comments) => dispatch(addComments(comments)),
    };
}

export default connect(
    null,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(App)
