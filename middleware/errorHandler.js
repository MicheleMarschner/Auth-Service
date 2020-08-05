const errorHandler = (err, req, res, next) => {
    const { statusCode, message, stack} = err;

    console.log(stack);

    res.status(statusCode || 500).json({
        sucess: false,
        error: message
    });
}

module.exports = errorHandler;