const express = require('express');
const router= express.Router();
const BancoController = require('../controllers/banco.controller');
const verifyToken = require ('../services/users.service');
const service = new verifyToken();

router
    .get('/', BancoController.get)
    .get('/:id', BancoController.getById)
    
        
module.exports = router;