import jwt from "jsonwebtoken";

const userInSession = (cookieToken) => {
    const contenidoToken = jwt.verify(cookieToken, process.env.JWT_SECRET);
    const {id, nombre} = contenidoToken;

    return nombre;
}

export {
    userInSession
}