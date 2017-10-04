import {setCategories, setPosts, addComments} from './actions/index'
import React, {Component} from 'react';
import Root from './components/Root';
import Post from './components/Post';
import PostForm from './components/PostFormModal';
import './App.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCategories, fetchPosts, fetchComments} from './utils/Api';

class App extends Component {

    componentDidMount() {
        fetchCategories().then((data) => (this.props.setCategories(data.categories)));

        fetchPosts().then((posts) => {
            this.props.setPosts(posts.filter((post) => !post.deleted));

            posts.forEach((post) => {
                fetchComments(post.id).then((comments) => {
                    this.props.addComments(comments)
                });
            });
        });
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
