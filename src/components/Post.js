import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {} from 'redux';
import {connect} from 'react-redux';
import {
    setCommentSortMethod,
    openCommentModal,
    closeCommentModal,
    updateCommentModalData,
    updatePostModalData,
    deletePost,
    openPostModal
} from "../actions/index";
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import {sortByAttribute} from "../utils/Sort"
import Sorter from "./Sorter";
import PropTypes from 'prop-types';
import VoteScore from './VoteScore';
import Modal from 'react-modal';
import PostFormModal from './PostFormModal';
import CategoryList from './CategoryList';
import {fetchDeletePost} from "../utils/Api";

class Post extends Component {

    render() {
        const {
                isDeleted,
                onDelete,
                updatePostModalData,
                voteScore,
                post,
                category,
                comment,
                setCommentSortMethod,
                openCommentModal,
                closeCommentModal,
                updateCommentModalData,
                openPostModal
            } = this.props,
            postDate = new Date((post) ? post.timestamp : null);

        const commentSortMethods = [
            {
                name: 'voteScoreAsc',
                attribute: 'voteScore',
                asc: true,
                label: 'Vote score ascending'
            },
            {
                name: 'voteScoreDesc',
                attribute: 'voteScore',
                asc: false,
                label: 'Vote score descending'
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

        const sortMethod = commentSortMethods.find((item) => item.name === comment.sortMethod);

        comment.comments = comment.comments
            .filter((comment) => !comment.deleted && comment.parentId === post.id)
            .sort((a, b) => sortByAttribute(a, b, sortMethod.attribute, sortMethod.asc));

        return isDeleted ? (
            <Redirect to="/"/>
        ) : (
            <div>
                <CategoryList/>

                <VoteScore id={post.id} type="post" score={voteScore}/>

                <div className="post-content">
                    <h2>{post.title}</h2>

                    <p className="subtitle">{`Posted by ${post.author} on ${postDate.toDateString()} in `} <Link
                        to={`/${category.path}`}>{category.name}</Link></p>
                    <p>{post.body}</p>

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

                <PostFormModal contentLabel="Edit post"/>

                <div className="hgroup">
                    <h2>{`${comment.comments.length} ${comment.comments.length === 1 ? 'Comment' : 'Comments'}`}</h2>

                    <p>
                        Sort comments by:
                        <Sorter value={comment.sortMethod} sortMethods={commentSortMethods}
                                onChange={setCommentSortMethod}/>
                    </p>
                </div>

                <button className="btn" onClick={() => {
                    updateCommentModalData({
                        parentId: post && post.id
                    });
                    openCommentModal();
                }}>Create comment
                </button>

                <Modal
                    isOpen={comment.modalIsOpen}
                    onRequestClose={closeCommentModal}
                    contentLabel="Create new comment"
                >
                    <button className="btn btn-close" onClick={closeCommentModal}>Close</button>

                    <CommentForm
                        post={post}
                        afterSubmit={closeCommentModal}
                    />
                </Modal>

                <CommentList comments={comment.comments} onEdit={(comment) => {
                    updateCommentModalData(comment);
                    openCommentModal();
                }}/>
            </div>
        );
    }
}

Post.propTypes = {
    match: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    commentSortMethod: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    openPostModal: PropTypes.func.isRequired,
    isDeleted: PropTypes.bool,
    updatePostModalData: PropTypes.func.isRequired,
    voteScore: PropTypes.number.isRequired,
    setCommentSortMethod: PropTypes.func.isRequired,
    openCommentModal: PropTypes.func.isRequired,
    closeCommentModal: PropTypes.func.isRequired,
    updateCommentModalData: PropTypes.func.isRequired
};

function mapStateToProps({post, categories, comment}, {match}) {
    let thePost = post.posts.find((item) => {
        return match.params.post_id === item.id;
    });

    let theCategory = {};
    if (thePost) {
        theCategory = categories.find((item) => {
            return thePost.category === item.path;
        });

        if (typeof theCategory === 'undefined') {
            theCategory = {};
        }
    } else {
        thePost = {};
    }

    return {
        post: thePost,
        isDeleted: (thePost) ? thePost.deleted : null,
        voteScore: (thePost) ? thePost.voteScore : null,
        category: theCategory,
        comment,
        commentSortMethod: comment.sortMethod,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCommentSortMethod: (method) => dispatch(setCommentSortMethod(method)),
        openCommentModal: () => dispatch(openCommentModal()),
        closeCommentModal: () => dispatch(closeCommentModal()),
        updateCommentModalData: (comment) => dispatch(updateCommentModalData(comment)),
        onDelete: (comment) => dispatch(deletePost(comment)),
        openPostModal: () => dispatch(openPostModal()),
        updatePostModalData: (post) => dispatch(updatePostModalData(post)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
