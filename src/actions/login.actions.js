import axios from 'axios';
import env from '../env/config'

export const authenticate = (username, password) => {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return (dispatch) => {

        dispatch({ type: "LOGIN_ATTEMPT" });

        console.log(env.gatewayHost + "chariot/gateway/webapp/user/authenticate")
        axios({
            method: 'post',
            url: env.gatewayHost + "chariot/gateway/webapp/user/authenticate",
            data: formData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        })
            .then(function (success) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    username: username
                })
            })
            .catch(function (error) {
                console.log(error)
                let message = 'There is No connection with server'
                if (error.response) {
                    message = error.response.data
                } else if ( error.message) {
                    message = error.message
                }

                dispatch({
                    type: 'LOGIN_FAILURE',
                    errorMessage: message
                })
            });
    }
}