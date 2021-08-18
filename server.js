// required modules
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const controllers = require("./controllers");

// port
const PORT = process.env.PORT || 3001;

// instance of express
const app = express();

// middleware
app.use(logger('dev'));

// json formatting and urlencoding
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// static assets
app.use(express.static('public'));

// connecction to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// routes
app.use(controllers);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
})