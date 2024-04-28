const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./models/post');
const errorHandler = require('./error-handler');
const path = require('path');
const flash = require('express-flash');

// Configurar la carpeta de vistas
app.set('views', path.join(__dirname, '../usocial-frontend/views'));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(flash());

// Rutas de posts
app.use('/api/posts', postRoutes);

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de vistas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res)=> {
  res.render('login');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

// Error handling
app.use(errorHandler);

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/usac-blog-forum', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});