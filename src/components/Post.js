import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {  } from 'redux';
import { connect } from 'react-redux';
import { fetchComments } from '../utils/Api';
import { setComments, setCommentSortMethod } from "../actions/index";
import CommentList from './CommentList';
import { sortByAttribute } from "../utils/Sort"
import Sorter from "./Sorter";
import PropTypes from 'prop-types';

class Post extends Component {

    componentDidMount() {
        fetchComments(this.props.match.params.post_id).then((comments) => (this.props.setComments(comments)));
    }

    render() {
        const { post, category, comment, setCommentSortMethod } = this.props,
            postDate = new Date(post.timestamp);

        const commentSortMethods = [
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

        const sortMethod = commentSortMethods.find((item) => item.name === comment.sortMethod);

        comment.comments = comment.comments
            .filter((comment) => comment.parentId === post.id)
            .sort((a ,b) => sortByAttribute(a, b, sortMethod.attribute, sortMethod.asc));

        return (
            <div>
                <div className="post-detail">
                    <h1>{post.title}</h1>
                    <p>{`Posted by ${post.author} on ${postDate.toDateString()} in `} <Link to={`/${category.path}`}>{category.name}</Link></p>
                    <p>{`Vote score: ${post.voteScore}`}</p>
                    <p>{post.body}</p>7
                    <p><Link to="/">To root</Link></p>
                </div>
                <div>
                    <p>
                        Sort comments by:
                        <Sorter value={comment.sortMethod} sortMethods={commentSortMethods} onChange={setCommentSortMethod} />
                    </p>
                    <h2>Comments</h2>
                    <CommentList comments={comment.comments}/>
                </div>
            </div>
        );
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    commentSortMethod: PropTypes.string.isRequired
};

function mapStateToProps({post, categories, comment}, {match}) {
    const thePost = post.posts.find((item) => {
        return !item.deleted && match.params.post_id === item.id;
    });

    let theCategory = null;
    if (thePost) {
        theCategory = categories.find((item) => {
            return thePost.category === item.path;
        });
    }

    return {
        post: thePost,
        category: theCategory,
        comment,
        commentSortMethod: comment.sortMethod
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setComments: (comments) => dispatch(setComments(comments)),
        setCommentSortMethod: (method) => dispatch(setCommentSortMethod(method))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);
