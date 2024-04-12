const jwt = require('jsonwebtoken')

const isauth = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Un-authorize user"

                });;
            } else {
                req.user = decode.id;
                next()
            }
        })
    } catch (error) {
        console.log(`error in is auth middlewire, ${error}`.bgRed);
        res.status(400).json({
            success: false,
            message: "Unauthorised user"
        })

    }
}

module.exports = isauth