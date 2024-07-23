const UsuariosService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const service = new UsuariosService();

    const login = async (req, res) => {
    const { correo, contrasenia } = req.body;
    console.log('Función login del servidor activada');
    try {
      // Realiza la lógica de autenticación aquí (puedes reutilizar tu lógica actual)
      const userId = await service.authenticateUser(correo, contrasenia);
  
      if (userId) {
        // Si las credenciales son válidas, genera un token y responde con él junto con el ID del usuario
        const token = service.generateToken(userId);
        res.json({ success: true, token, userId, message: 'Token y ID del usuario generados correctamente' });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales inválidas' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error en la autenticación' });
    }
};

const create = async (req, res) => {
    try {
        const response = await service.create(req.body);
        res.json({success: true, data: response});
    }catch(error){
        console.error(error);
        res.status(500).send({success: false, message: error.message});
    }
}
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
const _delete = async(req, res) => {
    try {
        const {id} = req.params;
        const response =  await service.delete(id);
        res.json(response);
    }catch(error){
        res.status(500).send({success: false, message: error.message});
    }
}
module.exports = {
    create, get, getById, update, _delete,login,//obtenerInicio
};