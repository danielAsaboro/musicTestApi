const Joi = require('joi')
const jwt = require('jsonwebtoken')
require('dotenv').config();
//const passwordCompexity = require('joi-password-complexity')
const mongoose = require('mongoose')

//creatinga a schemafor the user registration
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlenght: 5,
        maxlenght: 200,
        required: true
    },
    secondName: {
        type: String,
        minlenght: 5,
        maxlenght: 200,
        required: true
    },
    password: {
        type: String,
        minlenght: 20,
        maxlenght: 1000,
        required: true
    },
    email: {
        type: String,
        minlenght: 10,
        maxlenght: 50,
        unique: true,
        required: true


    }
}, { timestamps: true })
userSchema.methods.authMid = function() {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token

}

//creating the mode db
const regisUser = mongoose.model('user', userSchema)

//setting a strict password Option



function validRegist(userReg) {
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(200).required(),
        secondName: Joi.string().min(5).max(200).required(),
        password: Joi.string().min(5).max(20).required(),

        email: Joi.string().min(5).max(70).required().email()
    })

    return schema.validate(userReg)
}
const complexityOptions = {
    min: 5,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6
};
module.exports = complexityOptions
module.exports = { userSchema }

module.exports = { regisUser, validRegist }