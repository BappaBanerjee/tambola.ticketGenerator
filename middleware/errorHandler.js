const { constants } = require("../utils/constant");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", msg: err.message });
            break;
        case constants.UNAUTHORISED:
            res.json({ title: "Not Authorised", msg: err.message });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", msg: err.message });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", msg: err.message });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server error", msg: err.message });
            break;
        default:
            console.log("No error");
            break;
    }

    res.json({
        title: "Not Found",
        msg: err.message
    });
};

module.exports = errorHandler;