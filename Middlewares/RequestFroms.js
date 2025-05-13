import {body} from "express-validator";

const registerValidatorCreateUser = [
    body("email")
        .isEmail().withMessage("Formato de correo invalido")
        .normalizeEmail(),
    body("password")
        .isLength({min: 5}).withMessage("El password debe tener minimo 5 caracteres"),
    body("confirmar")
        .custom((value, {req}) => {
            if (value !== req.body.password){
                throw new Error("La confirmacion de passsword no coincide")
            }
            return true;
        })
];

const requestActualizacionPerfil = [
    body("nombre")
        .exists({checkNull: true, checkFalsy: true}).withMessage("El nombre es obligatorio"),
    body("email")
        .isEmail().withMessage("Formato de correo invalido")
        .normalizeEmail(),
    body("password")
        .isLength({min: 5}).withMessage("El password debe tener minimo 5 caracteres")
];

const requestValidatorLogin = [
    body("email")
        .isEmail().withMessage("Formato de correo invaido")
        .normalizeEmail()
];

const requestCreateMeeti = [
    body("titulo")
        .exists({checkNull: true, checkFalsy: true}).withMessage("El titulo es obligatorio"),
    body("grupo_id")
        .exists({checkNull: true, checkFalsy: true}).withMessage("El grupo es obligatorio"),
    body("fecha")
        .exists({checkNull: true, checkFalsy: true}).withMessage("La fecha es obligatoria"),
    body("hora")
        .exists({checkNull: true, checkFalsy: true}).withMessage("La hora es obligatoria"),
    body("descripcion")
        .exists({checkNull: true, checkFalsy: true}).withMessage("La descripcion es obligatoria"),
    body("direccion")
        .exists({checkNull: true, checkFalsy: true}).withMessage("La direccion es obligatoria"),
    body("ciudad")
        .exists({checkNull: true, checkFalsy: true}).withMessage("La ciudad es obligatoria"),
    body("estado")
        .exists({checkNull: true, checkFalsy: true}).withMessage("El estado es obligatorio"),
    body("pais")
        .exists({checkNull: true, checkFalsy: true}).withMessage("El pais es obligatorio"),
    body("lat")
        .exists({checkNull: true, checkFalsy: true}).withMessage("La latitud es obligatoria"),
    body("lng")
        .exists({checkNull: true, checkFalsy: true}).withMessage("La longitud es obligatoria")
]

export {
    registerValidatorCreateUser,
    requestValidatorLogin,
    requestCreateMeeti,
    requestActualizacionPerfil
}