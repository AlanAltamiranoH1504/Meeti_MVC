import multer from "multer";
import {tokenGeneral} from "../helpers/Tokens.js";
import path from "node:path";

//Almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/uploads/img_perfiles")
    },
    filename: async (req, file, cb) => {
        const token = tokenGeneral();
        const fileName = token + "_" + file.originalname;
        cb(null, fileName);
    }
});

//Validacion de archivos
const fileFilter = (req, file, cb) => {
    const permitidos = /jpeg|jpg|png/;
    const extensiones =  permitidos.test(path.extname(file.originalname).toLocaleLowerCase());
    const mime = permitidos.test(file.mimetype);
    if (extensiones && mime){
        cb(null, true);
    }else{
        cb(new Error("Solo se permiten imagenes JPG o PNG"));
    }
}

//Limites de tamaño de archivos
const uploadImgPerfil = multer({
    storage: storage,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: fileFilter
});
export default uploadImgPerfil;