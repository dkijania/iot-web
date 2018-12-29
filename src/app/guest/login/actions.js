import axios from 'axios';
import { env } from '../../config/config.js'
import { LOGIN_ATTEMPT, LOGIN_FAILURE, LOGIN_SUCCESS } from './actionTypes'
import { getErrorMessageFromResponse } from '../../../utils/rest/rest-utils'

export const authenticate = (username, password) => {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return (dispatch) => {

        dispatch({ type: LOGIN_ATTEMPT });
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
            .then(function () {
                dispatch({
                    type: LOGIN_SUCCESS,
                    username: username
                })
            })
            .catch(function (error) {
                dispatch({
                    type: LOGIN_FAILURE,
                    errorMessage: getErrorMessageFromResponse(error)
                })
            });
    }
}