import axios from 'axios';
import { env } from '../../config/config'
import { LOADING_CHANNEL_DATA, CHANNEL_DATA_LOADED, CHANNEL_DATA_LOADING_FAILURE } from './actionTypes'
import { getErrorMessageFromResponse } from '../../../utils/rest/rest-utils'

export const getChannelData = (channelId) => {

    return (dispatch) => {
        dispatch({ type: LOADING_CHANNEL_DATA });
        axios({
            method: 'get',
            url: env.gatewayHost + "chariot/gateway/webapp/measurement/getData?channelId=" + channelId,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        })
            .then(function (success) {
                dispatch({
                    type: CHANNEL_DATA_LOADED,
                    data: success.data
                })
            })
            .catch(function (error) {
                dispatch({
                    type: CHANNEL_DATA_LOADING_FAILURE,
                    errorMessage: getErrorMessageFromResponse(error)
                })
            });
    }
}