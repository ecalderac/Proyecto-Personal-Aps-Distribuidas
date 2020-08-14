'user strict'

var express = require('express');
var ListaController = require('../controllers/lista'); 

var api = express.Router(); 

//Rutas de Lista
api.post('/lista', ListaController.saveLista);
api.get('/lista/:id', ListaController.getLista);
api.get('/listas/:page?', ListaController.getListas);
api.put('/lista/:id', ListaController.modifyLista);
api.delete('/lista/:id', ListaController.deleteLista);




module.exports = api; 