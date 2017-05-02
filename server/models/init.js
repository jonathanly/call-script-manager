const mongoose = require('mongoose');

mongoose.connect(`${process.env.ALT_MONGO_URL}`)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', () => {
    console.log('Connected to the database.');
});

module.exports = db;
