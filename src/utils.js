const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Public/uploads');
  },
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, originalName + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Exporta el middleware con el nombre "uploader"
module.exports = multer({ storage });
