module.exports = {
    success: (res, message = '', data = null) => res.json({ status: true, message, data }),
    error: (res, errorObject = null) => {
        console.log(errorObject)// log to a event logger
        const message = errorObject.message != null ? errorObject.message : 'An error occurred'
        res.json({ status: true, message })
    }
}