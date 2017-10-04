const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const fetchInit = {
    headers: {
        'Authorization': 'api_key',
        'Content-Type': 'application/json'
    }
};

export function fetchCategories() {
    return fetch(`${API_ENDPOINT}/categories`, fetchInit)
        .then((res) => res.json());
}

export function fetchPosts() {
    return fetch(`${API_ENDPOINT}/posts`, fetchInit)
        .then((res) => res.json());
}

export function fetchComments(postId) {
    return fetch(`${API_ENDPOINT}/posts/${postId}/comments`, fetchInit)
        .then((res) => res.json());
}

export function fetchVotePostUp(postId) {
    return fetch(`${API_ENDPOINT}/posts/${postId}`, {
        ...fetchInit,
        method: 'POST',
        body: JSON.stringify({
            option: 'upVote'
        })
    },)
        .then((res) => res.json());
}

export function fetchVotePostDown(postId) {
    return fetch(`${API_ENDPOINT}/posts/${postId}`, {
        ...fetchInit,
        method: 'POST',
        body: JSON.stringify({
            option: 'downVote'
        })
    },)
        .then((res) => res.json());
}

export function fetchCreatePost(data) {
    return fetch(`${API_ENDPOINT}/posts/`, {
        ...fetchInit,
        method: 'POST',
        body: JSON.stringify(data)
    },)
        .then((res) => res.json());
}

export function fetchUpdatePost(data) {
    return fetch(`${API_ENDPOINT}/posts/${data.id}`, {
        ...fetchInit,
        method: 'PUT',
        body: JSON.stringify({
            title: data.title,
            body: data.body
        })
    },)
        .then((res) => res.json());
}

export function fetchDeletePost(postId) {
    fetch(`${API_ENDPOINT}/posts/${postId}`, {
        ...fetchInit,
        method: 'DELETE',
    },);
}

export function fetchCreateComment(data) {
    return fetch(`${API_ENDPOINT}/comments/`, {
        ...fetchInit,
        method: 'POST',
        body: JSON.stringify(data)
    },)
        .then((res) => res.json());
}

export function fetchUpdateComment(data) {
    return fetch(`${API_ENDPOINT}/comments/${data.id}`, {
        ...fetchInit,
        method: 'PUT',
        body: JSON.stringify({
            timestamp: data.timestamp,
            body: data.body
        })
    },)
        .then((res) => res.json());
}

export function fetchVoteCommentUp(commentId) {
    return fetch(`${API_ENDPOINT}/comments/${commentId}`, {
        ...fetchInit,
        method: 'POST',
        body: JSON.stringify({
            option: 'upVote'
        })
    },)
        .then((res) => res.json());
}

export function fetchVoteCommentDown(commentId) {
    return fetch(`${API_ENDPOINT}/comments/${commentId}`, {
        ...fetchInit,
        method: 'POST',
        body: JSON.stringify({
            option: 'downVote'
        })
    },)
        .then((res) => res.json());
}

export function fetchDeleteComment(commentId) {
    return fetch(`${API_ENDPOINT}/comments/${commentId}`, {
        ...fetchInit,
        method: 'DELETE',
    },)
        .then((res) => res.json());
}
