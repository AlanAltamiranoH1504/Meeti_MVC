import multer from 'multer';
import {tokenGeneral} from "../helpers/Tokens.js";
import path from "node:path";

//Almacenaje
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: async (req, file, cb) => {
        const token = tokenGeneral();
        const fileName = token + "_" + file.originalname;
        cb(null, fileName);
    }
});

//Validaciones de archivos
const fileFilter = (req, file, cb) => {
    const permitidos = /jpeg|jpg|png/;
    const extensiones = permitidos.test(path.extname(file.originalname).toLocaleLowerCase());
    const mime = permitidos.test(file.mimetype);
    if (extensiones && mime){
        cb(null, true);
    }else{
        cb(new Error("Solo se permiten imagenes JPG o PNG"));
    }
}

//Limites de tamaño de archivo
const upload = multer({
    storage: storage,
    limits: {fileSize: 2 * 1024 * 1024},
    fileFilter: fileFilter
});

export default upload;
