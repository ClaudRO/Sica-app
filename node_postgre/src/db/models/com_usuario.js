const {Model, DataTypes } = require('sequelize');

const COM_USUARIO_TABLE = 'ComUsuario';

class ComUsuario extends Model {
    static config(sequelize){
        return {
            sequelize,
            tableName: COM_USUARIO_TABLE,
            modelName: 'ComUsuario', 
            timestamps: false
        }
    }
    static associate(models) {
       this.belongsTo(models.Usuario);
       this.belongsTo(models.Cajero);
       
    }
    
}

const ComUsuarioSchema = {
    calificacion: {
        allowNull: true,
        type : DataTypes.INTEGER,
        field:'calificacion'
    },
    comentario: {
        allowNull: true,
        type : DataTypes.STRING,
        field:'comentario'
    }
    
}
module.exports = {ComUsuario, ComUsuarioSchema};


