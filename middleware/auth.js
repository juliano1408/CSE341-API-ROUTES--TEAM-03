const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        if (req.headers?.authorization?.startsWith('Bearer ')) {
            const idToken = req.headers.authorization.split('Bearer ')[1];
            const verify = await jwt.verify(idToken, "this is dummy text");
            next();
        }

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }

}