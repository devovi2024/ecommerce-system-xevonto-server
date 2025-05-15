const express = require('express');

const connectDB = require('./src/config/db');
const router = require('./src/routes/api');
connectDB();


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.send('Xevonto API is working...');
})

app.use('/api/v1', router)

module.exports = app;