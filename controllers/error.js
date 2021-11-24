exports.handleError = async (err, req, res, next) => {
    if (err)
        return res.status(err.statusCode || 500).json({
            error: err.message
        });
    return res.status(500).json({
        error: "Internal Error Server"
    });
}

exports.get404 = async (req, res, next) => {
    return res.status(404).json({
        error: "Page Not Found"
    });
}