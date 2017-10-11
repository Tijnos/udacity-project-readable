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
    byId: {},
    allIds: [],
    sortMethod: 'voteScoreDesc',
    modalIsOpen: false,
    postModalData: {}
}, action) {

    let byId = {},
        allIds = [];

    switch (action.type) {
        case SET_POSTS:
            byId = {};

            action.posts.forEach((post) => {
                byId[post.id] = post;
            });

            return Object.assign({}, state, {
                byId: byId,
                allIds: action.posts.map((post) => post.id)
            });
        case SET_POST_SORT_METHOD:
            return Object.assign({}, state, {
                sortMethod: action.method
            });
        case VOTE_POST_UP:
            byId = state.byId;

            state.allIds.forEach((id) => {
                if (id === action.postId) {
                    byId[id].voteScore++;
                }
            });

            return Object.assign({}, state, {
                byId
            });
        case VOTE_POST_DOWN:
            byId = state.byId;

            state.allIds.forEach((id) => {
                if (id === action.postId) {
                    byId[id].voteScore--;
                }
            });

            return Object.assign({}, state, {
                byId
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
            byId = state.byId;
            allIds = state.allIds;

            byId[action.post.id] = action.post;
            allIds.push(action.post.id);

            return Object.assign({}, state, {
                byId,
                allIds
            });
        case UPDATE_POST:
            byId = state.byId;

            byId[action.post.id] = action.post;

            return Object.assign({}, state, {
                byId
            });
        case DELETE_POST:
            byId = state.byId;

            allIds = state.allIds.filter((id) => id !== action.post.id);
            delete byId[action.post.id];

            return Object.assign({}, state, {
                byId,
                allIds
            });
        default:
            return state;
    }
}

function comment(state = {
    byId: {},
    allIds: [],
    sortMethod: 'voteScoreDesc',
    modalIsOpen: false,
    commentModalData: {}
}, action) {

    let byId = {},
        allIds = [];

    switch (action.type) {
        case ADD_COMMENTS:

            byId = state.byId;

            action.comments.forEach((comment) => {
                byId[comment.id] = comment;
            });

            return Object.assign({}, state, {
                byId: byId,
                allIds: Object.keys(byId)
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
            byId = state.byId;
            allIds = state.allIds;

            byId[action.comment.id] = action.comment;
            allIds.push(action.comment.id);

            return Object.assign({}, state, {
                byId,
                allIds
            });
        case UPDATE_COMMENT:
            byId = state.byId;

            byId[action.comment.id] = action.comment;

            return Object.assign({}, state, {
                byId
            });
        case VOTE_COMMENT_UP:
            byId = state.byId;

            state.allIds.forEach((id) => {
                if (id === action.commentId) {
                    byId[id].voteScore++;
                }
            });

            return Object.assign({}, state, {
                byId
            });
        case VOTE_COMMENT_DOWN:
            byId = state.byId;

            state.allIds.forEach((id) => {
                if (id === action.commentId) {
                    byId[id].voteScore--;
                }
            });

            return Object.assign({}, state, {
                byId
            });
        case DELETE_COMMENT:
            byId = state.byId;

            allIds = state.allIds.filter((id) => id !== action.comment.id);
            delete byId[action.comment.id];

            return Object.assign({}, state, {
                byId,
                allIds
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
