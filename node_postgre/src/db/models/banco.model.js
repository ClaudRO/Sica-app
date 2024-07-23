const {Model, DataTypes } = require('sequelize');

const BANCOS_TABLE = 'Banco';

class Banco extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: BANCOS_TABLE,
            modelName: 'Banco',
            timestamps: false, 
        }
    }
    static associate(models) {
       this.hasMany(models.Cajero,{
        as: 'cajeros',
        foreignKey: 'BancoId',
       });
    }

}

const BancoSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'nombre'
    },
    descripcion: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'descripcion'
    },
    
}
module.exports = {Banco, BancoSchema};
