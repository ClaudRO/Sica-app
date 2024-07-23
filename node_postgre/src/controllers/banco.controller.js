const BancoService = require('../services/banco.service');
const jwt = require('jsonwebtoken');
const service = new BancoService();
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
module.exports = {
    get, getById
};