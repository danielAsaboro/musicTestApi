const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('access denied')
    try {
        const decoded = jwt.verify(token, config.get('data.jwtSecret'))
        console.log('my decoded', decoded);
        req.loginName = decoded
        console.log('decoded', decoded);
        console.log('req.jwt', req.loginName);
        console.log(req.loginName._id);
        console.log('hi');
        next()
    } catch (err) {
        next(err)
        console.log('THE ERROR: ', err.message);

    }
}


module.exports = auth