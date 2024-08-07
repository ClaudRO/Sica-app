const EstadoCajeroService = require('../services/estado_cajero.service');
const jwt = require('jsonwebtoken');
const service = new EstadoCajeroService();
const get = async(req, res) => {
    try {
        const response =  await service.find();
        res.json(response);
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}
const getById = async(req, res) => {
    try {
        const {id} = req.params;
        const response =  await service.findOne(id);
        res.json(response);
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}
const getByCajeroId = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await service.findByCajeroId(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
const update = async(req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const response =  await service.update(id,body);
        res.json(response);
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}
module.exports = {
    get, getById,getByCajeroId,update
};