const express = require('express');
const cajerosRouter = require('./cajero.routes');
const usuariosRouter = require('./users.routes');
const bancosRouter = require('./banco.routes');
const estadoCajeroRouter= require('./estado_cajero.routes');
const comUsuarioRouter = require('./com_usuario.routes');

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/usuarios', usuariosRouter);
    router.use('/bancos', bancosRouter);
    router.use('/cajeros', cajerosRouter);
    router.use('/estadoCajeros',estadoCajeroRouter);
    router.use('/comUsuarios', comUsuarioRouter);


}




module.exports = routerApi;