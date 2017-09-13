import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const PostList = (props) => {
    const { posts } = props;

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
};

PostList.propTypes = {
    posts: PropTypes.array.isRequired
};

export default PostList;
