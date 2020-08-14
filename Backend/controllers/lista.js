'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Clase = require('../models/clase');
var Lista= require('../models/lista');
var Alumno = require('../models/alumno');

//Para guardar una Lista
function saveLista(req, res){
    var lista = new Lista();

    var params = req.body;
    lista.nro_lista = params.nro_lista;
    lista.fecha = params.fecha;
    lista.hora = params.hora;
    lista.clase = params.clase; 
    lista.alumnos = params.alumnos;
    
    lista.save((err, listaStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la lista'});
        }else{
            if(!listaStored){
                res.status(404).send({message: 'La lista no ha sido guardada'})
            }else{
                res.status(200).send({lista: listaStored});
            }
        }

    });
}

//Obteniendo todas las listas asociadas a las clases
function getListas(req, res){
    var claseId = req.params.clase;
 
    if(!claseId){
       //Sacar todos las listas de la BD
       var find = Lista.find({}).sort('nro_lista');
    }else{
       //Sacar las lista de una clase en concreto de la BD
       var find = Lista.find({clase: claseId}).sort('anio'); 
    }
 
    find.populate({path: 'clase'}).exec((err, lista) => {
          if(err){
             res.status(500).send({message: 'Error en la peticion'});
          }else{
             if(!lista){
                res.status(404).send({message: 'No hay listas'});
             }else{
                res.status(200).send({lista});
             }
          }
    });
 }

//Actualizando y modificando una lista
 function modifyLista(req, res){
    var listaId = req.params.id;
    var update = req.body;

    Lista.findByIdAndUpdate(listaId, update, (err, listaUpdated) => {
       if(err){
          res.status(500).send({message:'Error en el servidor'});
       }else{
          if(!listaUpdated){
             res.status(404).send({message: 'No se ha actualizado la lista'});
          }else{
             res.status(200).send({lista: listaUpdated});
          }
       }   
    });
}

//Borrando lista
function deleteLista(req, res){
    var listaId = req.params.id;
    Lista.findByIdAndRemove(listaId, (err, listaRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }
        else{
            if(!listaRemoved){
                res.status(404).send({message: 'No se ha borrado la lista'});
            }else{
                res.status(200).send({lista: listaRemoved});
            }
        }
    });
}

//Obtener una lista en particular
function getLista(req, res){ 
    var listaId = req.params.id;

    Lista.findById(listaId, (err, lista) => {
        if(err){
            res.status(500).send({message:'Error en la peticion.'});
        }
        else{
            if(!lista){
                res.status(404).send({message:'La lista no existe'});
            }else{
                res.status(200).send({lista});
            }
        }
    });
 
}


module.exports = {
    saveLista,
    getLista,
    getListas,
    modifyLista,
    deleteLista
};  