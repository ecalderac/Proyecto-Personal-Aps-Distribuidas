'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Clase = require('../models/clase');
var Lista= require('../models/lista');
var Alumno = require('../models/alumno'); 

function pruebas (req, res){
    res.status(200).send({
        message: 'Probando un accion del controlador de clase del api rest con Node y MongoDB'
    });
}

//Para guardar una clase
function saveClase(req, res){
    var clase = new Clase();

    var params = req.body;
    clase.nombre = params.nombre;
    clase.semestre = params.semestre;
    clase.anio = params.anio;
    
    clase.save((err, claseStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la clase'});
        }else{
            if(!claseStored){
                res.status(404).send({message: 'La clase no ha sido guardado'})
            }else{
                res.status(200).send({clase: claseStored});
            }
        }

    });
}

//Obtener una clase en particular
function getClase(req, res){ 
    var claseId = req.params.id;

    Clase.findById(claseId, (err, clase) => {
        if(err){
            res.status(500).send({message:'Error en la peticion.'});
        }
        else{
            if(!clase){
                res.status(404).send({message:'La clase no existe'});
            }else{
                res.status(200).send({clase});
            }
        }
    });
 
}

//Obtener todas las clases
function getClases(req, res){ 

    if(req.params.page){
        var page = req.params.page; 
    }else{
        var page = 1;
    }
    
    var itemsPerPage = 8;

    Clase.find().sort('nombre').paginate(page, itemsPerPage, function(err, clases, total){
        if(err){
            res.status(500).send({message:'Error en la peticion.'});
        }else{
            if(!clases){
                res.status(404).send({message:'No hay clases'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    clases: clases
                });
            }
        }
    });

}

//Modificar una Clase
function modifyClase(req, res){
    var claseId = req.params.id;
    var update = req.body;

    Clase.findByIdAndUpdate(claseId, update, (err, modifyClase) => {
        if(err){
            res.status(500).send({message:'Error al guardar la clase'});
        }else{
            if(!modifyClase){
                res.status(404).send({message:'La clase no ha sido actualizada'});
            }else{
                res.status(200).send({clase: modifyClase});
            }
        }
    })
}

//Eliminar una Clase
function deleteClase(req, res){ //busca todos los albumes por artista y los borra , el codigo es largo por lo mismo ya que borra todo lo encadenado
    var claseId = req.params.id;

    Clase.findByIdAndRemove(claseId, (err, claseRemoved) => {
        if(err){
            res.status(500).send({message:'Error al eliminar la clase'});
        }else{
            if(!claseRemoved){
                res.status(404).send({message:'La clase no ha sido eliminada'});
            }else{
                
                Lista.find({clase: claseRemoved._id}).remove((err, listaRemoved)=>{
                    if(err){
                        res.status(500).send({message:'Error al eliminar la lista'});
                    }else{
                        if(!listaRemoved){
                            res.status(404).send({message:'La lista no ha sido eliminada'});
                        }else{
                            
                            Alumno.find({lista: listaRemoved._id}).remove((err, alumnoRemoved) =>{
                                if(err){
                                    res.status(500).send({message: 'Error al eliminar alumno'});
                                }
                                else{
                                    if(!alumnoRemoved){
                                        res.status(404).send({message:'No se ha eliminado el Alumno'});
                                    }else{
                                        res.status(200).send({clase: claseRemoved});
                                    }

                                }

                            });

                        }

                    }
            });
                
            }
        }
    });
}


module.exports = {
    pruebas,
    saveClase,
    getClase,
    getClases,
    modifyClase,
    deleteClase
};  