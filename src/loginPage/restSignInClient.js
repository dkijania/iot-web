import axios from 'axios';
import env from '../config'

export const authenticate = (user, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    return (dispatch) => {
  
        dispatch({type: "LOGIN_ATTEMPT"});
 
        axios({
            method: 'post',
            url: env.gatewayHost + "/chariot/gateway/webapp/user/authenticate",
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (success) {
            dispatch({
                type: 'LOGIN_SUCCESS',
                username: username
            })
        })
        .catch(function (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                errorMessage: error.response.data.message
            })
        });
    }

}