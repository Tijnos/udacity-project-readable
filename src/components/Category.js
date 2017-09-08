import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {  } from 'redux';
import { connect } from 'react-redux';

class Category extends Component {

    render() {
        const { category } = this.props;

        return (
            <div>
                <h1>{category.name}</h1>
                <Link to="/">To root</Link>
            </div>
        );
    }
}

function mapStateToProps({categories}, {match}) {
    const category = categories.find((item) => {
        return match.params.categoryPath === item.path;
    });
    return {
        category
    };
}

export default connect(
    mapStateToProps,
)(Category);
