import axios from 'axios';
import { env } from '../../config/config'
import { LOADING_DASHBOARD_DATA, DASHBOARD_DATA_LOADED, DASHBOARD_DATA_LOADING_FAILURE } from './actionTypes'
import { getErrorMessageFromResponse } from '../../../utils/rest/rest-utils'

export const getDashboardData = (username) => {

    return (dispatch) => {
        dispatch({ type: LOADING_DASHBOARD_DATA });
        axios({
            method: 'get',
            url: env.gatewayHost + "chariot/gateway/webapp/channel/list?userName=" + username,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        })
            .then(function (success) {
                dispatch({
                    type: DASHBOARD_DATA_LOADED,
                    data: success.data
                })
            })
            .catch(function (error) {
                dispatch({
                    type: DASHBOARD_DATA_LOADING_FAILURE,
                    errorMessage: getErrorMessageFromResponse(error)
                })
            });
    }
}