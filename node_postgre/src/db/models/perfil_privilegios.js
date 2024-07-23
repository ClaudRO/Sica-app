const {Model, DataTypes } = require('sequelize');


const PERFIL_PRIV_TABLE = 'PerfilPrivilegios';

class PerfilPriv extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: PERFIL_PRIV_TABLE,
            modelName: 'PerfilPrivilegios', 
            timestamps: false
        }
    }
    static associate(models) {
       this.hasMany(models.Usuario,{
        as: 'Usuarios',
        foreignKey: 'id_perfil',

       });
    }
    
}

const PerfilPrivSchema = {
    descripcion: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'descripcion'
    },
    nombre: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'nombre'
    },
    CREATE: {
        allowNull: false,
        type : DataTypes.BOOLEAN,
        field:'crear'
    },
    DELETE: {
        allowNull: false,
        type : DataTypes.BOOLEAN,
        field:'eliminar'
    },
    GET: {
        allowNull: false,
        type : DataTypes.BOOLEAN,
        field:'mostrar'
    },
    UPDATE: {
        allowNull: false,
        type : DataTypes.BOOLEAN,
        field:'actualizar'
    }
}
module.exports = {PerfilPriv, PerfilPrivSchema};


