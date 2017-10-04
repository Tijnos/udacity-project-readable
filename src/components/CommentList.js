import React from 'react';
import PropTypes from 'prop-types';
import VoteScore from './VoteScore';
import {connect} from 'react-redux';
import {deleteComment} from '../actions/index';
import {fetchDeleteComment} from '../utils/Api';

const CommentList = (props) => {
    const {
        comments,
        onEdit,
        onDelete
    } = props;

    return (
        <ul className="comment-list">
            {comments.map((comment) => (
                <li key={comment.id}>
                    <VoteScore id={comment.id} type="comment" score={comment.voteScore}/>

                    <div className="comment-content">
                        <p className="subtitle">{`Comment by ${comment.author} on ${new Date((comment) ? comment.timestamp : null).toDateString()}`}</p>
                        <p>{comment.body}</p>

                        <div className="btn-group">
                            <button className="btn" onClick={() => onEdit(comment)}>Edit</button>

                            <button className="btn btn-warning" onClick={() => {
                                fetchDeleteComment(comment.id);

                                onDelete(comment)
                            }}>Delete
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        onDelete: (comment) => dispatch(deleteComment(comment)),
    };
}

export default connect(
    null,
    mapDispatchToProps
)(CommentList);
