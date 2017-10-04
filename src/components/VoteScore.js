import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {votePostUp, votePostDown, voteCommentUp, voteCommentDown} from '../actions/index';
import {connect} from 'react-redux';
import {fetchVotePostUp, fetchVotePostDown, fetchVoteCommentUp, fetchVoteCommentDown} from '../utils/Api';

class VoteScore extends Component {

    render() {
        const {
            id,
            score,
            onVoteUp,
            onVoteDown
        } = this.props;

        return typeof id !== 'undefined' && (
            <div className="vote-score">
                <button className="up" onClick={() => onVoteUp(id)}><span className="label">Vote Up</span></button>

                <p className="score"><span className="label">Vote score: </span>{score}</p>

                <button className="down" onClick={() => onVoteDown(id)}><span className="label">Vote Down</span>
                </button>
            </div>
        );
    }
}

VoteScore.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    score: PropTypes.number,
    onVoteUp: PropTypes.func.isRequired,
    onVoteDown: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch, {type}) {
    return {
        onVoteUp: (id) => {
            if (type === 'post') {
                fetchVotePostUp(id);

                return dispatch(votePostUp(id))
            } else if (type === 'comment') {
                fetchVoteCommentUp(id);

                return dispatch(voteCommentUp(id))
            }
        },
        onVoteDown: (id) => {
            if (type === 'post') {
                fetchVotePostDown(id);

                return dispatch(votePostDown(id))
            } else if (type === 'comment') {
                fetchVoteCommentDown(id);

                return dispatch(voteCommentDown(id))
            }
        }
    };
}

export default connect(
    null,
    mapDispatchToProps
)(VoteScore);
