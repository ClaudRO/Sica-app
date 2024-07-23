const { models } = require ('../libs/sequelize');

class ComUsuarioService {
    constructor(){}

    async find(){
        const res = await models.ComUsuario.findAll();
        return res;
    }
    async findOne(id){
        const res = await models.ComUsuario.findByPk(id);
        return res;
    }    
    async create(data){
            const res = await models.ComUsuario.create(data);
            return res;
    }
}

module.exports =  ComUsuarioService;

