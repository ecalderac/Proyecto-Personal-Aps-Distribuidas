'user strict'

var express = require('express');
var AlumnoController = require('../controllers/alumno'); 

var api = express.Router(); 
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './subida-imagenes/alumno'});

//Rutas de Lista
api.post('/alumno', AlumnoController.saveAlumno);
api.get('/alumno/:id', AlumnoController.getAlumno);
api.get('/alumnos/:page?', AlumnoController.getAlumnos);
api.put('/alumno/:id', AlumnoController.updateAlumno);
api.delete('/alumno/:id', AlumnoController.deleteAlumno);
api.post('/subir-imagen-alumno/:id', md_upload, AlumnoController.uploadImagenAlumno);
api.get('/obtener-imagen-alumno/:imageFile', AlumnoController.getImagenAlumno);
api.get('/obtener-alumnos', AlumnoController.getAllAlumnos);

module.exports = api; 