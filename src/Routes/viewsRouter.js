const express = require('express');
const viewsRouter = express.Router();
const { generateId } = require('../helpers');
const uploader = require('../utils');



module.exports = (io, manager) => {
  viewsRouter.get('/', async (req, res) => {
    try {
      const products = await manager.getProducts();
      res.render('home', { products: [] });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });

  // Ruta para la página de catálogo de productos
  viewsRouter.get('/index', (req, res) => {
    res.render('index', { products: manager.products });
  });

  // Ruta para el formulario de carga de productos
  viewsRouter.get('/realTimeProduct', (req, res) => {
    res.render('realTimeProduct', { action: '/products.json' }); // Asegúrate de pasar la ruta correcta para el formulario
  });

  viewsRouter.post('/products', uploader.single('thumbnails'), (req, res) => {
    const productData = {
      id: generateId(),
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status === 'true',
      stock: parseInt(req.body.stock),
      category: req.body.category,
      thumbnails: req.file ? req.file.path : null,
    };

    manager.addProduct(productData);
     // Redireccionar al catálogo después de agregar el producto
  res.redirect('/index');

    // Emitir evento de socket.io para notificar que se agregó un producto
    io.emit('productAdded', 'Nuevo producto agregado');

    res.json(productData);
  });
  

  viewsRouter.get('/productClient',(req,res)=>{
    res.render('productClient')
  })
  // ... otras rutas ...

  viewsRouter.post('/delete-product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
      await manager.deleteProduct(productId);
      res.json({ success: true }); // Devuelve una respuesta de éxito en formato JSON
      io.emit('productDeleted', productId); // Emitir evento de socket.io para notificar que se eliminó un producto
    } catch (error) {
      console.log('Error al eliminar el producto:', error.message);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });

  return viewsRouter;
};
  
