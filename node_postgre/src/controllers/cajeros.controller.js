const CajeroService = require('../services/cajero.service');
const jwt = require('jsonwebtoken');
const service = new CajeroService();
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
const create = async (req, res) => {
    try {
        const response = await service.create(req.body);
        res.json({success: true, data: response});
    }catch(error){
        console.error(error);
        res.status(500).send({success: false, message: error.message});
    }
}
module.exports = {
    get, getById,create
};