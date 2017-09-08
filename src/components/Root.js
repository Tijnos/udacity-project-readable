import {setCategories, setPosts, setPostSortMethod} from '../actions';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {  } from 'redux';
import { connect } from 'react-redux';
import { fetchCategories, fetchPosts } from '../utils/Api';

class Root extends Component {

    componentDidMount(){
        fetchCategories().then((data) => (this.props.setCategories(data.categories)));
        fetchPosts().then((posts) => (this.props.setPosts(posts.filter((post) => !post.deleted))));
    }

    render() {
        const { categories, post, setPostSortMethod } = this.props;

        const postSortMethods = [
            {
                name: 'voteScoreDesc',
                func: 'sortPostByVoteScoreDesc',
                label: 'Vore score descending'
            },
            {
                name: 'voteScoreAsc',
                func: 'sortPostByVoteScoreAsc',
                label: 'Vore score ascending'
            },
        ];

        const sortMethod = postSortMethods.find((item) => item.name === post.sortMethod).func;
        return (
            <div>
                <h2>Categories</h2>
                <ul>
                    {categories.map((category) => (
                        <li key={category.path}>
                            <Link to={`/${category.path}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
                <h2>Posts</h2>
                <p>
                    Sort posts by:
                    <select value={post.sortMethod} onChange={(event)=> setPostSortMethod(event.target.value)}>
                        {postSortMethods.map((method) => (
                            <option key={method.name} value={method.name}>{method.label}</option>
                        ))}
                    </select>
                </p>
                <ul>
                    {post.posts.sort(this[sortMethod]).map((post) => (
                        <li key={post.id}>
                            <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
                <Link to="/">To root</Link>
            </div>
        );
    }

    sortPostByVoteScoreDesc(a, b) {
        console.log('sorting desc')
        if (a.voteScore > b.voteScore) {
            return -1;
        } else if (a.voteScore < b.voteScore) {
            return 1;
        }
        return 0;
    }

    sortPostByVoteScoreAsc(a, b) {
        console.log('sorting asc')
        if (a.voteScore > b.voteScore) {
            return 1;
        } else if (a.voteScore < b.voteScore) {
            return -1;
        }
        return 0;
    }
}
function mapStateToProps({categories, post}) {
    return {
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
