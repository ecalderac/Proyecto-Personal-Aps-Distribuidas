'use strict'

const mongoose = require('mongoose'); //cargando modulo de MONGODB
const app = require('./app');
const port = process.env.PORT || 3000; //puerto del servidor web

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://adminecalderac:Q5NyP0QKhBk9Fxcf@cluster0.my1hc.mongodb.net/BD_NFC_FLUTTER', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Conexion establecida con la Base de Datos: MongoDB-Atlas");
        app.listen(port, function() {
            console.log("Servidor del API REST de NFC+FLUTTER escuchando en puerto: " + port);
        });
    }
}); //conectando a la base de datos de mongodb

//BD NUBE
//mongodb+srv://adminecalderac:Q5NyP0QKhBk9Fxcf@cluster0.my1hc.mongodb.net/BD_NFC_FLUTTER

//BD LOCAL
//mongodb://localhost:27017/BD_NFC_FLUTTER