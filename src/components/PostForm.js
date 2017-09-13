import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {  } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

Post.propTypes = {
    post: PropTypes.object.isRequired
};

function mapStateToProps({post}, {match}) {
    const thePost = post.posts.find((item) => {
        return match.params.post_id === item.id;
    });
    return {
        post: thePost
    };
}

export default connect(
    mapStateToProps,
)(Post);
