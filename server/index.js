require('dotenv').config();
const express = require('express');
const routs = require('./routs');
const mongoose = require('mongoose');
const { authMiddleWare } = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const { setCors } = require('./middlewares/cors')
const path = require('path');

const port=process.env.PORT || 3000;
const localDbUrl = process.env.LOCAL_DATABASE_URL;
const productionDb = process.env.PRODUCTION_DATABASE_URL;

const app = express();



app.use(setCors());
app.use(cookieParser());
app.use(express.json());
app.use(authMiddleWare);
app.use('/api', routs);





mongoose.connect(productionDb);
mongoose.connection.on('connected', () => console.log('connected to db'));
app.listen(port,  ()=> console.log(`Server is listening on port: ${port}`));