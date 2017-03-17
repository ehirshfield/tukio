import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
    if (Validator.isEmpty(data.fullname)) {
        errors.fullname = 'Name is required';
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}