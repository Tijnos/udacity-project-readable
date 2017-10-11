import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {updatePostModalDataValue, updatePostModalDataError, closePostModal} from '../actions/index';
import {connect} from 'react-redux';
import {addPost, updatePost} from '../actions/index';
import {fetchCreatePost, fetchUpdatePost} from '../utils/Api';
import {guid} from "../utils/Random";
import Modal from 'react-modal';

class PostFormModal extends Component {

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.updatePostModalDataValue(name, value);
    }

    handleSubmit(event) {
        event.preventDefault();

        let valid = true,
            create = !('id' in this.props),
            post = {
                id: create ? guid() : this.props['id'].value,
                timestamp: create ? Date.now() : this.props['timestamp'].value
            };

        const requiredPostData = create ? [
            'title',
            'body',
            'author',
            'category'
        ] : [
            'title',
            'body'
        ];

        requiredPostData.forEach((name) => {
            if (!this.props[name] ||
                !this.props[name].value ||
                this.props[name].value.length === 0) {

                this.props.updatePostModalDataError(name, 'Field is required');
                valid = false;
            } else if (this.props[name].error) {
                this.props.updatePostModalDataError(name, null)
            }

            if (this.props[name] && this.props[name].value) {
                post[name] = this.props[name].value;
            }
        });

        if (valid) {
            if (create) {
                fetchCreatePost(post).then((post) => {
                    this.props.addPost(post);

                    this.props.closePostModal();
                });
            } else {
                fetchUpdatePost(post).then((post) => {
                    this.props.updatePost(post);

                    this.props.closePostModal();
                });
            }
        }
    }

    render() {
        const {
                contentLabel,
                title,
                body,
                author,
                category,
                categories,
                postModalIsOpen,
                closePostModal
            } = this.props,
            create = !('id' in this.props);

        return (
            <Modal
                isOpen={postModalIsOpen}
                onRequestClose={closePostModal}
                contentLabel={contentLabel}
            >
                <button className="btn btn-close" onClick={closePostModal}>Close</button>

                <h3>{contentLabel}</h3>

                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                        <label>
                            Title
                            <input
                                onChange={(event) => this.handleInputChange(event)}
                                type="text"
                                name="title"
                                value={title.value || ''}
                                placeholder="Title"
                            />
                            {title.error && (
                                <p className="error">{title.error}</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <label>
                            Body
                            <textarea
                                onChange={(event) => this.handleInputChange(event)}
                                name="body"
                                value={body.value || ''}
                                placeholder="Body"
                            />
                            {body.error && (
                                <p className="error">{body.error}</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <label>
                            Author
                            {(create && (
                                <input
                                    onChange={(event) => this.handleInputChange(event)}
                                    type="text"
                                    name="author"
                                    value={author.value || ''}
                                    placeholder="Author"
                                />
                            )) || (
                                <input readOnly="true" type="text" value={author.value || ''}/>
                            )}
                            {author.error && (
                                <p className="error">{author.error}</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <label>
                            Category
                            {(create && (
                                <select onChange={(event) => this.handleInputChange(event)} name="category"
                                        value={category.value || ''}>
                                    <option key="" value="">Choose</option>
                                    {categories.map((category) => (
                                        <option key={category.path} value={category.path}>{category.name}</option>
                                    ))}
                                </select>
                            )) || (
                                <select readOnly="true" name="category"
                                        value={category.value || ''}>
                                    <option key="" value="">Choose</option>
                                    {categories.map((category) => (
                                        <option key={category.path} value={category.path}>{category.name}</option>
                                    ))}
                                </select>
                            )}
                            {category.error && (
                                <p className="error">{category.error}</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <button className="btn" type="submit">Save</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

PostFormModal.propTypes = {
    contentLabel: PropTypes.string.isRequired,
    title: PropTypes.object,
    body: PropTypes.object,
    author: PropTypes.object,
    category: PropTypes.object,
    categories: PropTypes.array.isRequired,
    afterSubmit: PropTypes.func,
    postModalIsOpen: PropTypes.bool.isRequired,
    closePostModal: PropTypes.func.isRequired
};

PostFormModal.defaultProps = {
    title: {value: ''},
    body: {value: ''},
    author: {value: ''},
    category: {value: ''}
};


function mapStateToProps({post, categories}) {
    return {
        ...post.postModalData,
        postModalIsOpen: post.modalIsOpen,
        categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updatePostModalDataValue: (name, value) => dispatch(updatePostModalDataValue(name, value)),
        updatePostModalDataError: (name, error) => dispatch(updatePostModalDataError(name, error)),
        addPost: (post) => dispatch(addPost(post)),
        updatePost: (post) => dispatch(updatePost(post)),
        closePostModal: () => dispatch(closePostModal())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFormModal);
