import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class CategoryList extends Component {
    render() {
        const {
            activeCategory,
            categories
        } = this.props;

        return (
            <ul className="category-list">
                <li className={Object.keys(activeCategory).length === 0 ? 'active' : ''}>
                    <Link to={`/`}>all categories</Link>
                </li>

                {categories.map((category) => (
                    <li className={activeCategory.path === category.path ? 'active' : ''}
                        key={category.path}>
                        <Link to={`/${category.path}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps({categories}, {match}) {
    let activeCategory = {};

    if (typeof match.params.category !== 'undefined') {
        activeCategory = categories.find((item) => {
            return match.params.category === item.path;
        });

        if (typeof activeCategory === 'undefined') {
            activeCategory = {};
        }
    }

    return {
        activeCategory,
        categories
    };
}

CategoryList.propTypes = {
    match: PropTypes.object.isRequired,
    activeCategory: PropTypes.object,
    categories: PropTypes.array.isRequired,
};

export default withRouter(connect(
    mapStateToProps,
    null
)(CategoryList));
