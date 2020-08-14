'user strict'

var express = require('express');
var ClaseController = require('../controllers/clase'); 

var api = express.Router(); 

//Rutas de Clase
api.get('/probando-controlador', ClaseController.pruebas);
api.post('/clase', ClaseController.saveClase);
api.get('/clase/:id', ClaseController.getClase);
api.get('/clases/:page?', ClaseController.getClases);
api.put('/clase/:id', ClaseController.modifyClase);
api.delete('/clase/:id', ClaseController.deleteClase);



module.exports = api; 