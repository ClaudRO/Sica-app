const {Model, DataTypes } = require('sequelize');
const { EstadoCajero } = require('./estado_cajero');

const CAJEROS_TABLE = 'Cajero';

class Cajero extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: CAJEROS_TABLE,
            modelName: 'Cajero', 
            timestamps: false
        }
    }
    static associate(models) {
       this.belongsTo(models.Banco);
       this.hasMany(models.ComUsuario);
       this.hasOne(models.EstadoCajero)
       
    }
    
}


const CajeroSchema = {
    direccion: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'direccion'
    },
    Latitud: {
        allowNull: false,
        type : DataTypes.FLOAT,
        field:'latitud'
    },
    Longitud: {
        allowNull: true,
        type : DataTypes.FLOAT,
        field:'longitud'
    },
    BancoId: {
        allowNull: true,
        type : DataTypes.INTEGER,
        field:'BancoId'
    }
    
}
module.exports = {Cajero, CajeroSchema};


