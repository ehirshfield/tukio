import React from 'react';
import classnames from 'classnames';

const TextField = ({ type, name, value, label, error, onChange}) => {
    return (
        <div className={classnames("form-group", { 'has-error': error })}>
            <label className="control-label">{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={name}
                className="form-control"
            />
            <span className="help-block">{error}</span>
        </div>
    )
}

TextField.propTypes = {
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
}

export default TextField;