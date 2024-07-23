const express = require('express');
const router= express.Router();
const comUsuarioController = require('../controllers/com_usuario.controller');
const verifyToken = require ('../services/users.service');
const service = new verifyToken();

router
    .get('/', comUsuarioController.get)
    .get('/:id', comUsuarioController.getById)
    .post('/', comUsuarioController.create)
    
        
module.exports = router;