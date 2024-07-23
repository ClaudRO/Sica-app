const {Model, DataTypes } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

const ESTADO_CAJEROS_TABLE = 'EstadoCajero';

class EstadoCajero extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: ESTADO_CAJEROS_TABLE,
            modelName: 'EstadoCajero', 
            timestamps: true
        }
    }
    static associate(models) {
       this.belongsTo(models.Cajero);
    }
    
}

const EstadoCajeroSchema = {
    op_general: {
        allowNull: false,
        type : DataTypes.BOOLEAN,
        field:'op_general'
    },
    acces_disc: {
        allowNull: false,
        type : DataTypes.BOOLEAN,
        field:'acceso disc'
    },
    hab_depo: {
        allowNull: false,
        type : DataTypes.BOOLEAN,
        field:'hab dep'
    }
    
}
module.exports = {EstadoCajero, EstadoCajeroSchema};


