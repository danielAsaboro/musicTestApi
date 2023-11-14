const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals')
const userRoute = require('./routes/userRoute')
const express = require('express');
const app = express();
const authLogin = require('./routes/auth')

const config = require('config')
console.log('appName: ' + config.get("appName"));
console.log('password ;' + config.get("appPassword"));
console.log('data :' + config.get('data.host'));
if (!config.get('data.jwtSecret')) {
    console.error('no secret key');
    process.exit(1)
}
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true }, { useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
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


const req = {}