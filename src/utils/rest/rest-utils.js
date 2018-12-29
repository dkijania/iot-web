export function getErrorMessageFromResponse(error){
    let message = 'There is No connection with server'
    if (error.response) {
        message = error.response.data
    } else if (error.message) {
        message = error.message
    }
    return message
}