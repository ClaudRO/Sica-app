const { models } = require ('../libs/sequelize');
const {config} = require('../config/config')
const jwt = require('jsonwebtoken');

class UsuariosService {
    constructor(){}

    async find(){
        const res = await models.Usuario.findAll();
        return res;
    }
    async findOne(id){
        const res = await models.Usuario.findByPk(id);
        return res;
    }
    async create(data){
        const res = await models.Usuario.create(data);
        return res;
    }
    async update(id, data){
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }
    async delete(id){
        const model = await this.findOne(id);
        await model.destroy();
        return {deleted: true};
    }
    async authenticateUser(email, password) {
        // Lógica de autenticación, devuelve el ID del usuario si las credenciales son válidas
        const user = await models.Usuario.findOne({
          where: { correo: email, contrasenia: password },
        });
    
        if (user) {
          return user.id;
        } else {
          return null; // Credenciales inválidas
        }
      }
    generateToken=(userId)=>{
        return jwt.sign({userId},config.secretKey,{expiresIn:'1h'});
    };
    verifyToken = (req, res, next) => {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Token not provided' });
      }
      const token = authHeader.split(' ')[1];

  // Imprime en la consola el token recibido, esto es útil para propósitos de registro y depuración
      console.log('Received token:', token);
      jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
          
          return res.status(401).json({ success: false, message: 'Invalid token' });
        }
  
        req.userId = decoded.userId;
        next();
      });
    };
}

module.exports = UsuariosService;
