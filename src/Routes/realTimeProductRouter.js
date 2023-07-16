// const express = require('express');
// const router = express.Router();
// const ProductManager = require('../../components/ProductManager');
// const { generateId } = require('../../components/Helpers');
// const multer = require('multer');
// const path = require('path');

// const manager = new ProductManager('../productos.json');

// // Configuración de Multer para el almacenamiento de imágenes
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads');
//   },
//   filename: (req, file, cb) => {
//     // Código de generación del nombre del archivo
//   }
// });

// const upload = multer({ dest: 'public/uploads' });

// // Ruta para la página de creación en tiempo real
// router.get('/', (req, res) => {
//   res.render('realTimeProduct');
// });

// // Ruta para procesar la creación del producto en tiempo real
// router.post('/', upload.array('thumbnails', 5), async (req, res) => {
//   try {
//     const { title, description, code, price, stock, category } = req.body;

//     if (!title || !description || !code || !price || !stock || !category) {
//       return res.status(400).json({ error: 'Todos los campos son obligatorios' });
//     }

//     const thumbnails = req.files.map(file => file.filename);

//     const newProduct = {
//       id: generateId(),
//       title,
//       description,
//       code,
//       price,
//       status: true,
//       stock,
//       category,
//       thumbnails
//     };

//     await manager.addProduct(newProduct);
//     this.products.push(newProduct);
// this.saveProducts();


//     // Emitir el evento 'newProduct' a todos los clientes conectados
//     req.app.get('io').emit('newProduct', JSON.stringify(newProduct));

//     res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al agregar el producto' });
//   }
// });

// module.exports = router;

