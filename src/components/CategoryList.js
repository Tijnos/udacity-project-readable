import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoryList = (props) => {
    const { categories } = props;

    return (
        <ul>
            {categories.map((category) => (
                <li key={category.path}>
                    <Link to={`/${category.path}`}>{category.name}</Link>
                </li>
            ))}
        </ul>
    );
};

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired
};

export default CategoryList;
