import {setPostSortMethod, openPostModal, updatePostModalData} from '../actions';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import CategoryList from './CategoryList';
import PostList from './PostList';
import {sortByAttribute} from '../utils/Sort';
import Sorter from './Sorter';
import PropTypes from 'prop-types';
import PostFormModal from "./PostFormModal";

class Root extends Component {

    render() {
        const {
            category,
            post,
            setPostSortMethod,
            openPostModal,
            updatePostModalData
        } = this.props;

        const postSortMethods = [
                {
                    name: 'voteScoreAsc',
                    attribute: 'voteScore',
                    asc: true,
                    label: 'Vore score ascending'
                },
                {
                    name: 'voteScoreDesc',
                    attribute: 'voteScore',
                    asc: false,
                    label: 'Vore score descending'
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
            ],
            sortMethod = postSortMethods.find((item) => item.name === post.sortMethod),
            activeCategory = Object.keys(category).length > 0,
            posts = post.allIds
                .filter((postId) => (!activeCategory || post.byId[postId].category === category.path))
                .map((postId) => post.byId[postId])
                .sort((a, b) => sortByAttribute(a, b, sortMethod.attribute, sortMethod.asc));

        return (
            <div>
                <CategoryList/>

                <div className="hgroup">
                    {activeCategory ? (
                        <h2>Posts in {category.name}</h2>
                    ) : (
                        <h2>All posts</h2>
                    )}

                    <p>
                        Sort posts by:
                        <Sorter value={post.sortMethod} sortMethods={postSortMethods} onChange={setPostSortMethod}/>
                    </p>
                </div>

                {posts.length > 0 ? (
                    <PostList posts={posts}/>
                ) : (
                    <p>No posts available</p>
                )}

                <button className="btn" onClick={() => {
                    updatePostModalData({
                        category: category && category.path
                    });
                    openPostModal();
                }}>Create post
                </button>

                <PostFormModal contentLabel="Create new post"/>
            </div>
        );
    }
}

Root.propTypes = {
    match: PropTypes.object.isRequired,
    category: PropTypes.object,
    categories: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    setPostSortMethod: PropTypes.func.isRequired,
    openPostModal: PropTypes.func.isRequired,
    updatePostModalData: PropTypes.func.isRequired
};

function mapStateToProps({categories, post}, {match}) {
    let category = {};

    if (typeof match.params.category !== 'undefined') {
        category = categories.find((item) => {
            return match.params.category === item.path;
        });

        if (typeof category === 'undefined') {
            category = {};
        }
    }

    return {
        category,
        categories,
        post
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPostSortMethod: (method) => dispatch(setPostSortMethod(method)),
        openPostModal: () => dispatch(openPostModal()),
        updatePostModalData: (post) => dispatch(updatePostModalData(post)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);
