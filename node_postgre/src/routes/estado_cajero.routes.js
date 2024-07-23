const express = require('express');
const router= express.Router();
const EstadoCajeroController = require('../controllers/estado_cajero.controller');
const verifyToken = require ('../services/users.service');
const service = new verifyToken();

router
    .get('/',  EstadoCajeroController.get)    
    .get('/:id',  EstadoCajeroController.getByCajeroId)
    .get('/cajero/:id',  EstadoCajeroController.getById)
    .put('/:id', EstadoCajeroController.update)



    
        
module.exports = router;