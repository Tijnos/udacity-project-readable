import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {  } from 'redux';
import { connect } from 'react-redux';

class Post extends Component {

    render() {
        const { post } = this.props;

        return (
            <div>
                <h1>{post.title}</h1>
                <Link to="/">To root</Link>
            </div>
        );
    }
}

function mapStateToProps({post}, {match}) {
    const thePost = post.posts.find((item) => {
        return match.params.postId === item.id;
    });
    return {
        post: thePost
    };
}

export default connect(
    mapStateToProps,
)(Post);
