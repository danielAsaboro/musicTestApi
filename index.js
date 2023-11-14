const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals')
const userRoute = require('./routes/userRoute')
const express = require('express');
const app = express();
const authLogin = require('./routes/auth')


require('dotenv').config();
mongoose.connect('mongodb://127.0.0.1:27017/vidly', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => {
        console.error('Could not connect to MongoDB...');
        console.log(error);
    });

//setting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/register/user', userRoute)
app.use('/api/register/user/login', authLogin)
// const env = app.get('env')
// console.log(env);
const checkEnv = process.env.NODE_ENV
console.log(`you set it to ${checkEnv}`);
//app.set('port', process.env.PORT || 3000)


const port = process.env.PORT || 3000;
//app.listen(() => console.log('currently listening on ' + app.get('port')));
app.listen(port, () => {
    console.log(`you are now on port ${port}`);
})


// const req = {}