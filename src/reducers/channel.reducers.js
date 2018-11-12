const initialState = {
    isLoading: false,
    error: '',
    data: '',
};

export default (state = initialState, action) => {
    console.log('LOADING_CHANNEL_DATA', action);
    switch (action.type) {
        case 'LOADING_CHANNEL_DATA':
            return { ...state, isLoading: true, error: '' };
        case 'CHANNEL_DATA_LOADED':
            return { ...state, data: action, isLoading: false, error: '' };
        case 'CHANNEL_DATA_LOADING_FAILURE':
            return { ...state, error: action.errorMessage, isLoading: false };
        default:
            return state;
    }
};