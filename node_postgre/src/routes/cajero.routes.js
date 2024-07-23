const express = require('express');
const router= express.Router();
const CajeroController = require('../controllers/cajeros.controller');
const verifyToken = require ('../services/users.service');
const service = new verifyToken();

router
    .get('/', CajeroController.get)
    .get('/:id', CajeroController.getById)

    .post('/', CajeroController.create)

module.exports = router;