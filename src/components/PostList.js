import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import VoteScore from './VoteScore';
import PostFormModal from './PostFormModal';
import {updatePostModalData, openPostModal, deletePost} from '../actions/index';
import {fetchDeletePost} from '../utils/Api';

class PostList extends Component {

    render() {
        const {
            posts,
            comment,
            openPostModal,
            updatePostModalData,
            onDelete
        } = this.props;

        let commentCount;

        return (
            <div>
                <ul className="post-list">
                    {posts.map((post) => {
                        commentCount = comment.allIds.filter(id => comment.byId[id].parentId === post.id).length;

                        return (
                            <li key={post.id}>
                                <VoteScore id={post.id} type="post" score={post.voteScore}/>

                                <div className="post-content">
                                    <h2><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h2>

                                    <p className="subtitle">{`Posted by ${post.author} on ${new Date(post.timestamp).toDateString()}.
                                     ${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}`}
                                    </p>

                                    <div className="btn-group">
                                        <button className="btn" onClick={() => {
                                            updatePostModalData(post);

                                            openPostModal();
                                        }}>Edit
                                        </button>

                                        <button className="btn btn-warning" onClick={() => {
                                            fetchDeletePost(post.id);

                                            onDelete(post)
                                        }}>Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <PostFormModal contentLabel="Edit post"/>
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    openPostModal: PropTypes.func.isRequired,
    updatePostModalData: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

function mapStateToProps({comment}) {
    return {
        comment
    };
}

function mapDispatchToProps(dispatch) {
    return {
        openPostModal: () => dispatch(openPostModal()),
        updatePostModalData: (post) => dispatch(updatePostModalData(post)),
        onDelete: (post) => dispatch(deletePost(post))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);
