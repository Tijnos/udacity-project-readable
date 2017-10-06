import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {updateCommentModalDataValue, updateCommentModalDataError} from '../actions/index';
import {connect} from 'react-redux';
import {addComment, updateComment} from '../actions/index';
import {fetchCreateComment, fetchUpdateComment} from '../utils/Api';
import {guid} from "../utils/Random";

class CommentForm extends Component {

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.updateCommentModalDataValue(name, value);
    }

    handleSubmit(event) {
        event.preventDefault();

        let valid = true,
            create = !('id' in this.props),
            comment = {
                id: create ? guid() : this.props['id'].value,
                timestamp: create ? Date.now() : this.props.timestamp.value,
                parentId: this.props.post.id
            };

        const requiredCommentData = create ? [
            'body',
            'author',
        ] : [
            'body'
        ];

        requiredCommentData.forEach((name) => {
            if (!this.props[name] ||
                !this.props[name].value ||
                this.props[name].value.length === 0) {

                this.props.updateCommentModalDataError(name, 'Field is required');
                valid = false;
            } else if (this.props[name].error) {
                this.props.updateCommentModalDataError(name, null)
            }
            if (this.props[name] && this.props[name].value) {
                comment[name] = this.props[name].value;
            }
        });

        if (valid) {
            if (create) {
                fetchCreateComment(comment).then((comment) => {
                    this.props.addComment(comment);

                    if (typeof this.props.afterSubmit === 'function') {
                        this.props.afterSubmit();
                    }
                });
            } else {
                fetchUpdateComment(comment).then((comment) => {
                    this.props.updateComment(comment);

                    if (typeof this.props.afterSubmit === 'function') {
                        this.props.afterSubmit(comment);
                    }
                });
            }
        }
    }

    render() {
        const {
                body,
                author
            } = this.props,
            create = !('id' in this.props);

        return (
            <div>
                {create ? (
                    <h2>Add comment</h2>
                ) : (
                    <h2>Edit comment</h2>
                )}

                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                        <label>
                            Body
                            <textarea onChange={(event) => this.handleInputChange(event)} name="body"
                                      value={body.value || ''}/>
                            {body.error && (
                                <p className="error">{body.error}</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <label>
                            Author
                            {(create && (
                                <input onChange={(event) => this.handleInputChange(event)} type="text" name="author"
                                       value={author.value || ''}/>
                            )) || (
                                <input readOnly="true" type="text" value={author.value || ''}/>
                            )}
                            {author.error && (
                                <p className="error">{author.error}</p>
                            )}
                        </label>
                    </div>

                    <div>
                        <button className="btn" type="submit">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
    body: PropTypes.object,
    author: PropTypes.object,
    afterSubmit: PropTypes.func.isRequired,
    addComment: PropTypes.func,
    updateCommentModalDataError: PropTypes.func.isRequired,
    updateCommentModalDataValue: PropTypes.func.isRequired,
    updateComment: PropTypes.func,
};

CommentForm.defaultProps = {
    body: {value: ''},
    author: {value: ''},
};

function mapStateToProps({comment}) {
    return comment.commentModalData;
}

function mapDispatchToProps(dispatch) {
    return {
        updateCommentModalDataValue: (name, value) => dispatch(updateCommentModalDataValue(name, value)),
        updateCommentModalDataError: (name, error) => dispatch(updateCommentModalDataError(name, error)),
        addComment: (comment) => dispatch(addComment(comment)),
        updateComment: (comment) => dispatch(updateComment(comment)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentForm);
