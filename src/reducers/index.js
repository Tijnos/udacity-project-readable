import {
    SET_CATEGORIES,
    SET_POSTS,
    SET_POST_SORT_METHOD,
    VOTE_POST_UP,
    VOTE_POST_DOWN,
    OPEN_POST_MODAL,
    CLOSE_POST_MODAL,
    UPDATE_POST_MODAL_DATA_VALUE,
    UPDATE_POST_MODAL_DATA_ERROR,
    UPDATE_POST_MODAL_DATA,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    ADD_COMMENTS,
    SET_COMMENT_SORT_METHOD,
    UPDATE_COMMENT_MODAL_DATA_VALUE,
    UPDATE_COMMENT_MODAL_DATA_ERROR,
    UPDATE_COMMENT_MODAL_DATA,
    ADD_COMMENT,
    UPDATE_COMMENT,
    VOTE_COMMENT_UP,
    VOTE_COMMENT_DOWN,
    DELETE_COMMENT,
    OPEN_COMMENT_MODAL,
    CLOSE_COMMENT_MODAL
} from "../actions";

import {combineReducers} from 'redux';

function categories(state = [], action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;

        default:
            return state;
    }
}

function post(state = {
    posts: [],
    sortMethod: 'voteScoreDesc',
    modalIsOpen: false,
    postModalData: {}
}, action) {

    switch (action.type) {
        case SET_POSTS:
            return Object.assign({}, state, {
                posts: action.posts
            });
        case SET_POST_SORT_METHOD:
            return Object.assign({}, state, {
                sortMethod: action.method
            });
        case VOTE_POST_UP:
            return Object.assign({}, state, {
                posts: state.posts.map((post) => {
                    if (post.id === action.postId) {
                        post.voteScore++;
                    }
                    return post;
                })
            });
        case VOTE_POST_DOWN:
            return Object.assign({}, state, {
                posts: state.posts.map((post) => {
                    if (post.id === action.postId) {
                        post.voteScore--;
                    }
                    return post;
                })
            });
        case OPEN_POST_MODAL:
            return Object.assign({}, state, {
                modalIsOpen: true
            });
        case CLOSE_POST_MODAL:
            return Object.assign({}, state, {
                modalIsOpen: false
            });
        case UPDATE_POST_MODAL_DATA_VALUE:
            return Object.assign({}, state, {
                postModalData: {
                    ...state.postModalData,
                    [action.name]: {
                        ...state.postModalData[action.name],
                        value: action.value
                    }
                }
            });
        case UPDATE_POST_MODAL_DATA_ERROR:
            return Object.assign({}, state, {
                postModalData: {
                    ...state.postModalData,
                    [action.name]: {
                        ...state.postModalData[action.name],
                        error: action.error
                    }
                }
            });
        case UPDATE_POST_MODAL_DATA:
            let postModalData = {};

            Object.keys(action.post).forEach((name) => {
                postModalData[name] = {value: action.post[name]};
            });

            return Object.assign({}, state, {
                postModalData: postModalData
            });
        case ADD_POST:
            return Object.assign({}, state, {
                posts: [
                    ...state.posts,
                    action.post
                ]
            });
        case UPDATE_POST:
            return Object.assign({}, state, {
                posts: state.posts.map((item) => {
                    return (item.id === action.post.id) ? action.post : item;
                })
            });
        case DELETE_POST:
            return Object.assign({}, state, {
                posts: state.posts.filter(post => post.id !== action.post.id)
            });
        default:
            return state;
    }
}

function comment(state = {
    comments: [],
    sortMethod: 'voteScoreDesc',
    modalIsOpen: false,
    commentModalData: {}
}, action) {

    switch (action.type) {
        case ADD_COMMENTS:
            const comments = action.comments.filter((comment) =>
                typeof state.comments.find((stateComment) => stateComment.id === comment.id) === 'undefined'
            );

            return Object.assign({}, state, {
                comments: [...state.comments, ...comments]
            });
        case SET_COMMENT_SORT_METHOD:
            return Object.assign({}, state, {
                sortMethod: action.method
            });
        case OPEN_COMMENT_MODAL:
            return Object.assign({}, state, {
                modalIsOpen: true
            });
        case CLOSE_COMMENT_MODAL:
            return Object.assign({}, state, {
                modalIsOpen: false
            });
        case UPDATE_COMMENT_MODAL_DATA_VALUE:
            return Object.assign({}, state, {
                commentModalData: {
                    ...state.commentModalData,
                    [action.name]: {
                        ...state.commentModalData[action.name],
                        value: action.value
                    }
                }
            });
        case UPDATE_COMMENT_MODAL_DATA_ERROR:
            return Object.assign({}, state, {
                commentModalData: {
                    ...state.commentModalData,
                    [action.name]: {
                        ...state.commentModalData[action.name],
                        error: action.error
                    }
                }
            });
        case UPDATE_COMMENT_MODAL_DATA:
            let commentModalData = {};

            Object.keys(action.comment).forEach((name) => {
                commentModalData[name] = {value: action.comment[name]};
            });

            return Object.assign({}, state, {
                commentModalData: commentModalData
            });
        case ADD_COMMENT:
            return Object.assign({}, state, {
                comments: [
                    ...state.comments,
                    action.comment
                ]
            });
        case UPDATE_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments.map((item) => {
                    return (item.id === action.comment.id) ? action.comment : item;
                })
            });
        case VOTE_COMMENT_UP:
            return Object.assign({}, state, {
                comments: state.comments.map((comment) => {
                    if (comment.id === action.commentId) {
                        comment.voteScore++;
                    }
                    return comment;
                })
            });
        case VOTE_COMMENT_DOWN:
            return Object.assign({}, state, {
                comments: state.comments.map((comment) => {
                    if (comment.id === action.commentId) {
                        comment.voteScore--;
                    }
                    return comment;
                })
            });
        case DELETE_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments.map(comment => {
                    if (comment.id === action.comment.id) {
                        comment.deleted = true;
                    }
                    return comment;
                })
            });
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    post,
    comment
});
