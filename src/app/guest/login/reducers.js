import { LOGIN_ATTEMPT, LOGIN_FAILURE, LOGIN_SUCCESS } from './actionTypes'

const initialState = {
    isLoading: false,
    error: '',
    isAuthenticated: false,
    username: '',
    login: '',
    password: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return { ...state, isLoading: true, isAuthenticated: false, error: '' };
        case LOGIN_SUCCESS:
            return { ...state, username: action.username, isLoading: false, isAuthenticated: true, error: '' };
        case LOGIN_FAILURE:
            return { ...state, error: action.errorMessage, isLoading: false, isAuthenticated: false };
        default:
            return state;
    }
};