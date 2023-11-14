const Joi = require('joi');
const mongoose = require('mongoose');
const { userSchema } = require('./user')
const { regisUser, validRegist } = require('./user')


// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         minlenght: 5,
//         maxlenght: 200,
//         required: true
//     },
//     secondName: {
//         type: String,
//         minlenght: 5,
//         maxlenght: 200,
//         required: true
//     },
//     password: {
//         type: String,
//         minlenght: 20,
//         maxlenght: 1000,
//         required: true
//     },
//     email: {
//         type: String,
//         minlenght: 10,
//         maxlenght: 50,
//         unique: true,
//         required: true


//     }
// }, { timestamps: true })
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }


});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        userId: Joi.required()
    });

    return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;