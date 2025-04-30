import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const protegerRuta = (req, res, next) => {
    const cookieToken = req.cookies.token_meeti;
    if (!cookieToken){
        res.redirect("/")
    }
    try {
        const contenidoToken = jwt.verify(cookieToken, process.env.JWT_SECRET);
        const {id} = contenidoToken;
        if (!id) {
            res.redirect("/")
        }
        next();
    }catch (error) {
        console.log("Error en middleware");
        console.log(error.message);
    }
}
export {
    protegerRuta
}