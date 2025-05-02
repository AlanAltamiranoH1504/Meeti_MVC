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

const requestValidatorLogin = [
    body("email")
        .isEmail().withMessage("Formato de correo invaido")
        .normalizeEmail()
];

export {
    registerValidatorCreateUser,
    requestValidatorLogin
}