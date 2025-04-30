/**
 * RELACIONES ENTRE MODELOS
 */

import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";
import Grupo from "./Grupo.js";

//Un grupo pertenece a una categoria
Grupo.belongsTo(Categoria,{
    foreignKey: "categoria_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});
//Una categoria puede tener muchos grupos
Categoria.hasMany(Grupo);

//Un grupo pertenece a un usuario
Grupo.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
//Un usuario puede tener muchos grupos
Usuario.hasMany(Grupo);

export {
    Usuario,
    Categoria,
    Grupo
}