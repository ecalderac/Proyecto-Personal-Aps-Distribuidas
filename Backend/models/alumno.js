'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlumnoSchema = Schema({
        nombre: String,
        apellido: String,
        rut: String,
        email: String,
        telefono: Number,
        carrera: String,
        image: String,
        lista: {type: Schema.ObjectId, ref: 'Lista'}
}); 

module.exports = mongoose.model('Alumno', AlumnoSchema); 