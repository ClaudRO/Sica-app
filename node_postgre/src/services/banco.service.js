const { models } = require ('../libs/sequelize');

class BancoService {
    constructor(){}

    async find(){
        const res = await models.Banco.findAll();
        return res;
    }
    async findOne(id){
        const res = await models.Banco.findByPk(id);
        return res;

}
}
module.exports = BancoService;

