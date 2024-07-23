const { models } = require ('../libs/sequelize');

class CajeroService {
    constructor(){}

    async find(){
        const res = await models.Cajero.findAll();
        return res;
    }
    async findOne(id){
        const res = await models.Cajero.findByPk(id);
        return res;
    }
    async create(data){
            const res = await models.Cajero.create(data);
            return res;
    }


}
module.exports = CajeroService;
