export const SET_CATEGORIES = 'SET_CATEGORIES';

export const SET_POSTS = 'SET_POSTS';
export const SET_POST_SORT_METHOD = 'SET_POST_SORT_METHOD';
export const VOTE_POST_UP = 'VOTE_POST_UP';
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN';
export const OPEN_POST_MODAL = 'OPEN_POST_MODAL';
export const CLOSE_POST_MODAL = 'CLOSE_POST_MODAL';
export const UPDATE_POST_MODAL_DATA_VALUE = 'UPDATE_POST_MODAL_DATA_VALUE';
export const UPDATE_POST_MODAL_DATA_ERROR = 'UPDATE_POST_MODAL_DATA_ERROR';
export const UPDATE_POST_MODAL_DATA = 'UPDATE_POST_MODAL_DATA';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const ADD_COMMENTS = 'ADD_COMMENTS';
export const SET_COMMENT_SORT_METHOD = 'SET_COMMENT_SORT_METHOD';
export const OPEN_COMMENT_MODAL = 'OPEN_COMMENT_MODAL';
export const CLOSE_COMMENT_MODAL = 'CLOSE_COMMENT_MODAL';
export const UPDATE_COMMENT_MODAL_DATA_VALUE = 'UPDATE_COMMENT_MODAL_DATA_VALUE';
export const UPDATE_COMMENT_MODAL_DATA_ERROR = 'UPDATE_COMMENT_MODAL_DATA_ERROR';
export const UPDATE_COMMENT_MODAL_DATA = 'UPDATE_COMMENT_MODAL_DATA';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP';
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export function setCategories(categories) {
    return {
        type: SET_CATEGORIES,
        categories
    };
}

export function setPosts(posts) {
    return {
        type: SET_POSTS,
        posts
    };
}

export function setPostSortMethod(method) {
    return {
        type: SET_POST_SORT_METHOD,
        method
    };
}


export function addComments(comments) {
    return {
        type: ADD_COMMENTS,
        comments
    };
}

export function setCommentSortMethod(method) {
    return {
        type: SET_COMMENT_SORT_METHOD,
        method
    };
}

export function votePostUp(postId) {
    return {
        type: VOTE_POST_UP,
        postId
    };
}

export function votePostDown(postId) {
    return {
        type: VOTE_POST_DOWN,
        postId
    };
}

export function openPostModal() {
    return {
        type: OPEN_POST_MODAL,
    };
}

export function closePostModal() {
    return {
        type: CLOSE_POST_MODAL,
    };
}

export function updatePostModalDataValue(name, value) {
    return {
        type: UPDATE_POST_MODAL_DATA_VALUE,
        name,
        value
    };
}

export function updatePostModalDataError(name, error) {
    return {
        type: UPDATE_POST_MODAL_DATA_ERROR,
        name,
        error
    };
}

export function updatePostModalData(post) {
    return {
        type: UPDATE_POST_MODAL_DATA,
        post
    };
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    };
}

export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    };
}

export function deletePost(post) {
    return {
        type: DELETE_POST,
        post
    };
}

export function openCommentModal() {
    return {
        type: OPEN_COMMENT_MODAL,
    };
}

export function closeCommentModal() {
    return {
        type: CLOSE_COMMENT_MODAL,
    };
}

export function updateCommentModalDataValue(name, value) {
    return {
        type: UPDATE_COMMENT_MODAL_DATA_VALUE,
        name,
        value
    };
}

export function updateCommentModalDataError(name, error) {
    return {
        type: UPDATE_COMMENT_MODAL_DATA_ERROR,
        name,
        error
    };
}

export function updateCommentModalData(comment) {
    return {
        type: UPDATE_COMMENT_MODAL_DATA,
        comment
    };
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    };
}

export function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    };
}

export function voteCommentUp(commentId) {
    return {
        type: VOTE_COMMENT_UP,
        commentId
    };
}

export function voteCommentDown(commentId) {
    return {
        type: VOTE_COMMENT_DOWN,
        commentId
    };
}


export function deleteComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    };
}
