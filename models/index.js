/**
 * RELACIONES ENTRE MODELOS
 */

import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";
import Grupo from "./Grupo.js";
import Meeti from "./Meeti.js";
import Comentario from "./Comentario.js";

//Un grupo pertenece a una categoria
Grupo.belongsTo(Categoria,{
    foreignKey: "categoria_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});
//Una categoria puede tener muchos grupos
Categoria.hasMany(Grupo, {
    foreignKey: "categoria_id",
});

//Un grupo pertenece a un usuario
Grupo.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
//Un usuario puede tener muchos grupos
Usuario.hasMany(Grupo, {
    foreignKey: "usuario_id",
});


//Un Meeti pertenece un grupo
Meeti.belongsTo(Grupo, {
    foreignKey: "grupo_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
//Un grupo puede tener muchos meetis
Grupo.hasMany(Meeti,{
    foreignKey: "grupo_id"
});

//Un meeti pertenece a un usuario
Meeti.belongsTo(Usuario,{
    foreignKey: "usuario_id",
    onUpdate: "CASCADE",
    onDelete: "CASCCADE"
});
//Un usuario puede tener muchos meetis
Usuario.hasMany(Meeti, {
    foreignKey: "usuario_id"
});

// Un comentario pertenece a un Usuario
Comentario.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
//Un puede Usuario tener muchos comentarios
Usuario.hasMany(Comentario, {
    foreignKey: "usuario_id"
});

//Un comentario pertenece a una Meeti
Comentario.belongsTo(Meeti, {
    foreignKey: "meeti_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
});
//Un Meeti puede tener muchos comentarios
Meeti.hasMany(Comentario, {
    foreignKey: "meeti_id"
});

export {
    Usuario,
    Categoria,
    Grupo
}