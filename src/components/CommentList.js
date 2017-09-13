import React from 'react';
import PropTypes from 'prop-types';

const CommentList = (props) => {
    const { comments } = props;

    return (
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    {comment.body}
                </li>
            ))}
        </ul>
    );
};

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
};

export default CommentList;
