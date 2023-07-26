const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'Public/uploads')); // Ruta correcta para almacenar las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extname; // Nombre de archivo único para evitar colisiones
    cb(null, filename);
  }
});

const uploader = multer({ storage });

module.exports = uploader;

