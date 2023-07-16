const express = require('express');
const viewsRouter = express.Router();
const ProductManager = require('../../components/ProductManager');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const manager = new ProductManager('../productos.json');

// Configuración de multer para manejar la carga de imágenes
const upload = multer({ dest: 'Public/uploads/' }); // Directorio donde se guardarán las imágenes

// Ruta para la página de inicio
viewsRouter.get('/', async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para la página de catálogo de productos
viewsRouter.get('/index', (req, res) => {
  res.render('index', { products: manager.products });
});

// Ruta para el formulario de carga de productos
viewsRouter.get('/addProduct', (req, res) => {
  res.render('addProduct');
});

// Ruta para agregar un nuevo producto con carga de imagen
viewsRouter.post('/productos', upload.single('thumbnails'), async (req, res) => {
  console.log('Información del archivo:', req.file);
   console.log('Datos del formulario:', req.body);
  try {
    const product = {
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      category: req.body.category,
      thumbnails: req.file ? req.file.filename : '', // Nombre del archivo de la imagen cargada
      status: true // Valor por defecto de status
    };

    const productId = await manager.addProduct(product);
    console.log('Producto agregado correctamente:', productId);

    res.redirect('/'); // Redirige a la página de inicio después de agregar el producto
  } catch (error) {
    console.log('Error al agregar el producto:', error.message);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

module.exports = viewsRouter;


