const mongoose = require('mongoose')
const { regisUser, validRegist } = require('../models/user')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const complexityOptions = require('../models/user')
const auth = require('./routeMid')
const passwordCompexity = require('joi-password-complexity')

router.get('/', auth, async(req, res) => {
    const getUser = await regisUser.findById(req.loginName._id).select('-password')
    console.log(getUser, 'the user');
    try {
        return res.json({ message: 'the user exist on the database', success: true }).status(200) ? true : res.json({ message: 'user does nt exist', success: false })

    } catch (err) {
        res.send(err.message)
    }



})
router.post('/', async(req, res) => {
    const { firstName, secondName, email, password, id } = req.body

    passwordCompexity(complexityOptions).validate(req.body.password)
    const { error, warning, value } = validRegist(req.body)
    if (error) {
        const bodyCheck = error.details[0].message.replace(/"g/, ' ')
        res.status(400).send(bodyCheck)
        return
    }

    let user = await regisUser.findOne({ email: email })
    console.log(user);

    const lo = _.pick(user, ['email'])
    if (user) {
        res.status(400).json({
            success: true,
            data: `the email already exist with name ${user.firstName}`,
            userData: lo
        })

        return
    } else {
        let newRegis = new regisUser(
            // {
            //     // firstName: firstName,
            //     // secondName: secondName,
            //     // password: password,
            //     // email: email

            // }

            //replacing with lodash
            _.pick(req.body, ['firstName', 'secondName', 'password', 'email'])

        );
        const genSalt = await bcrypt.genSalt(10)
        newRegis.password = await bcrypt.hash(newRegis.password, genSalt)


        await newRegis.save()

        res.send(newRegis)
    }

})
module.exports = router