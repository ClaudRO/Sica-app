const { Usuario, UsuarioSchema } = require("./usuarios.model");
const {Cajero, CajeroSchema} = require("./cajeros.model");
const {Banco, BancoSchema} = require("./banco.model");
const {EstadoCajero, EstadoCajeroSchema} = require("./estado_cajero");
const {ComUsuario, ComUsuarioSchema} = require("./com_usuario");
const {PerfilPriv, PerfilPrivSchema} = require("./perfil_privilegios")

function setupModels (sequelize){
    Usuario.init(UsuarioSchema, Usuario.config(sequelize));
    Cajero.init(CajeroSchema, Cajero.config(sequelize));
    Banco.init(BancoSchema, Banco.config(sequelize));
    EstadoCajero.init(EstadoCajeroSchema, EstadoCajero.config(sequelize));
    ComUsuario.init(ComUsuarioSchema, ComUsuario.config(sequelize));
    PerfilPriv.init(PerfilPrivSchema, PerfilPriv.config(sequelize));
    

    /* si bien se declara la relacion por los 2 lados funciona con declarar u inicializar una de las 2 */

    Usuario.hasMany(ComUsuario);
    ComUsuario.belongsTo(Usuario);

    Usuario.belongsTo(PerfilPriv);
    PerfilPriv.hasMany(Usuario);

    ComUsuario.belongsTo(Cajero);
    Cajero.hasMany(ComUsuario);

    Cajero.belongsTo(Banco);
    Banco.hasMany(Cajero);

    Cajero.hasOne(EstadoCajero);
    EstadoCajero.belongsTo(Cajero);

    


    

    

    

    
   



}

module.exports = setupModels;