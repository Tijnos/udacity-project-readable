import {setCategories, setPosts, setPostSortMethod} from '../actions';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {  } from 'redux';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../utils/Api';
import CategoryList from './CategoryList';
import PostList from './PostList';
import { sortByAttribute } from '../utils/Sort';
import Sorter from './Sorter';
import PropTypes from 'prop-types';

class Root extends Component {

    componentDidMount(){
        fetchCategories().then((data) => (this.props.setCategories(data.categories)));
        fetchPosts().then((posts) => (this.props.setPosts(posts.filter((post) => !post.deleted))));
    }

    render() {
        const { category, categories, post, setPostSortMethod } = this.props;

        const postSortMethods = [
            {
                name: 'voteScoreDesc',
                attribute: 'voteScore',
                asc: true,
                label: 'Vore score descending'
            },
            {
                name: 'voteScoreAsc',
                attribute: 'voteScore',
                asc: false,
                label: 'Vore score ascending'
            },
            {
                name: 'timestampAsc',
                attribute: 'timestamp',
                asc: true,
                label: 'Timestamp ascending'
            },
            {
                name: 'timestampDesc',
                attribute: 'timestamp',
                asc: false,
                label: 'Timestamp descending'
            },
        ];

        const sortMethod = postSortMethods.find((item) => item.name === post.sortMethod);

        const posts = post.posts
            .filter((item) => (category === null || item.category === category.path))
            .sort((a ,b) => sortByAttribute(a, b, sortMethod.attribute, sortMethod.asc));

        return (
            <div>
                {category === null ? (
                    <div>
                        <h2>Categories</h2>
                        <CategoryList categories={categories}/>
                    </div>
                ) : (
                    <div>
                        <h1>{category.name}</h1>
                        <Link to="/">Back to all categories</Link>
                    </div>
                )}
                <h2>Posts</h2>
                <p>
                    Sort posts by:
                    <Sorter value={post.sortMethod} sortMethods={postSortMethods} onChange={setPostSortMethod} />
                </p>
                {posts.length > 0 ? (
                    <PostList posts={posts}/>
                ) : (
                    <p>No posts available</p>
                )}
                <Link to="/postForm">Create post</Link>
            </div>
        );
    }
}

Root.propTypes = {
    category: PropTypes.object,
    categories: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    setPostSortMethod: PropTypes.func.isRequired
};

function mapStateToProps({categories, post}, { match }) {
    let category = null;

    if (typeof match.params.category !== 'undefined') {
        category = categories.find((item) => {
            return match.params.category === item.path;
        });
    }

    return {
        category,
        categories,
        post
    };
}
function mapDispatchToProps(dispatch) {
    return {
        setCategories: (categories) => dispatch(setCategories(categories)),
        setPosts: (posts) => dispatch(setPosts(posts)),
        setPostSortMethod: (method) => dispatch(setPostSortMethod(method))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root)
