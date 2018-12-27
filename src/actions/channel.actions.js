import axios from 'axios';
import env from '../env/config'

export const getChannelData = (channelId) => {
   
    return (dispatch) => {
        console.log(env.gatewayHost + "chariot/gateway/webapp/measurement/getData?channelId="+channelId)
     
        dispatch({ type: 'LOADING_CHANNEL_DATA'});     
    
      
        axios({
            method: 'get',
            url: env.gatewayHost + "chariot/gateway/webapp/measurement/getData?channelId="+channelId,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        })
            .then(function (success) {
                dispatch({
                    type: 'CHANNEL_DATA_LOADED',
                    data: success.data
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
                    type: 'CHANNEL_DATA_LOADING_FAILURE',
                    errorMessage: message
                })
            });
    }
}