'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var ClaseSchema = Schema({
        nombre: String, //nombre de la clase -->ejm:Ing. Software Avanzada
        semestre: String,
        anio: Number
}); 

module.exports = mongoose.model('Clase', ClaseSchema); 