import React from 'react';
import PropTypes from 'prop-types';

const Sorter = (props) => {
    const { value, sortMethods, onChange } = props;

    return (
        <select value={value} onChange={(event)=> onChange(event.target.value)}>
            {sortMethods.map((method) => (
                <option key={method.name} value={method.name}>{method.label}</option>
            ))}
        </select>
    );
};

Sorter.propTypes = {
    value: PropTypes.string.isRequired,
    sortMethods: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Sorter;
