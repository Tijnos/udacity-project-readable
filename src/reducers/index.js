import {
    SET_CATEGORIES,
    SET_POSTS,
    SET_POST_SORT_METHOD
} from "../actions";

import { combineReducers } from 'redux';

function categories(state = [], action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;

        default:
            return state;
    }
}

function post(state = { posts: [], sortMethod: 'voteScoreDesc' }, action) {
    switch (action.type) {
        case SET_POSTS:
            return Object.assign({}, state, {
                posts: action.posts
            });
        case SET_POST_SORT_METHOD:
            return Object.assign({}, state, {
                sortMethod: action.method
            });
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    post
});
