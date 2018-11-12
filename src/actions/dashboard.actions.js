import axios from 'axios';
import env from '../env/config'

export const getDashboardData = (username) => {
   
    return (dispatch) => {
        console.log(env.gatewayHost + "chariot/gateway/webapp/channel/list?userName="+username)
     
        dispatch({ type: 'LOADING_DASHBOARD_DATA'});     
    
      
        axios({
            method: 'get',
            url: env.gatewayHost + "chariot/gateway/webapp/channel/list?userName="+username ,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        })
            .then(function (success) {
                dispatch({
                    type: 'DASHBOARD_DATA_LOADED',
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
                    type: 'DASHBOARD_DATA_LOADING_FAILURE',
                    errorMessage: message
                })
            });
    }
}