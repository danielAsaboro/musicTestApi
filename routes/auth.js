const Joi = require('joi')
const { Schema } = require('mongoose')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const { regisUser } = require('../models/user')
router.post('/', async(req, res) => {
    const { usernameId, userPassword } = req.body
    const { error, warning } = authValid(req.body)
    if (error) {
        const errData = error.details[0].message.replace(/"g/, ' ')
        console.log(errData);
        res.json({
            success: false,
            data: errData
        })
        return
    }
    //validatiing  username
    let loginName = await regisUser.findOne({ email: usernameId })


    if (!loginName) return res.status(400).send('invalid username or password')


    //validating the password
    let passValid = await bcrypt.compare(userPassword, loginName.password)
    if (!passValid) return res.status(400).json({ success: false, data: `the username or password is incorrect` });
    console.log(passValid);
    console.log(req.loginName)

    //generating jwt token
    const validAuth = loginName.authMid()
    console.log(validAuth, 'this is valid');
    res.header('x-auth-token', validAuth).send('logged in')

})

function authValid(login) {
    const schema = Joi.object({
        usernameId: Joi.string().min(5).max(50).required().email(),
        userPassword: Joi.string().min(5).max(50).required()

    })
    return schema.validate(login)
}

module.exports = router