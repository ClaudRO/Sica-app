const { models } = require ('../libs/sequelize');

class EstadoCajeroService {
    constructor(){}

    async find(){
        const res = await models.EstadoCajero.findAll();
        return res;
    }
    async findOne(id){
        const res = await models.EstadoCajero.findByPk(id);
        return res;
    }
    async findByCajeroId(cajeroId) {
        console.log("se activo findbycajerosid de service", cajeroId)
            const estado = await models.EstadoCajero.findOne({ where: { CajeroId: cajeroId } });
            return estado;
    }
    async update(id, data){
        const model = await this.findOne(id);
        const res = await model.update(data);
        return res;
    }


}
module.exports = EstadoCajeroService;

