const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const fetchInit = {
    headers: {
        'Authorization': 'api_key'
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
