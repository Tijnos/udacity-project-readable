export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const SET_POST_SORT_METHOD = 'SET_POST_SORT_METHOD';
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENT_SORT_METHOD = 'SET_COMMENT_SORT_METHOD';

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


export function setComments(comments) {
    return {
        type: SET_COMMENTS,
        comments
    };
}

export function setCommentSortMethod(method) {
    return {
        type: SET_COMMENT_SORT_METHOD,
        method
    };
}
