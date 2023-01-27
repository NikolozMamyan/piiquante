const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const helmet = require("helmet");
const mongoose = require('mongoose');

const sauceRoute = require('./Routes/sauces');
const authRoutes = require('./Routes/auth');

require('dotenv').config()

const password = process.env.DB_PASSWORD


mongoose.connect(`mongodb+srv://nika67:${password}@cluster0.qmffetn.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/sauces', sauceRoute);
  app.use ('/api/auth', authRoutes);
 

module.exports = app;
app.use(helmet());