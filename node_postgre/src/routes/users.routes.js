const express = require('express');
const router= express.Router();
const usuariosController = require('../controllers/users.controller');
const verifyToken = require ('../services/users.service');
const service = new verifyToken();

router
    .get('/', usuariosController.get)
    .get('/:id', service.verifyToken,usuariosController.getById)
    .post('/', usuariosController.create)
    .put('/:id', verifyToken,usuariosController.update)
    .delete('/:id', usuariosController._delete)
    .post('/login', usuariosController.login);
        
module.exports = router;