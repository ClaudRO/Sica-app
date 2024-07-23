const {Model, DataTypes } = require('sequelize');
const { PerfilPriv } = require('./perfil_privilegios');

const USUARIO_TABLE = 'Usuario';

class Usuario extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: USUARIO_TABLE,
            modelName: 'Usuario',
            timestamps: false, 
        }
    }
    static associate(models) {
        this.hasMany(models.ComUsuario,{
            as: 'comentarios',
            foreignKey: 'id',
        });
       this.belongsTo(PerfilPriv);
    }
}

const UsuarioSchema = {

    nombre: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'nombre'
    },
    apellido: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'apellido'
    },
    contrasenia: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'contrasenia'
    },
    fechaDeNacimiento: {
        allowNull: true,
        type : DataTypes.DATE,
        field:'fechaDeNacimiento'
    },
    correo: {
        allowNull: false,
        type : DataTypes.STRING,
        field:'correo'
    },
    numeroCelular: {
        allowNull: true,
        type : DataTypes.INTEGER,
        field:'celular'
    }

}
module.exports = {Usuario, UsuarioSchema};
