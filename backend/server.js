const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./passport');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

app.use('/api/oauth', require('./routes/google'));    
app.use('/api/users', require('./routes/users'));     
app.use('/api/encuesta', require('./routes/encuesta')); 
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${process.env.PORT}`);
});
