const express = require('express');
const viewsRouter = express.Router();
const ProductManager = require('../../components/ProductManager');

const manager = new ProductManager('../productos.json');

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
// Ruta para agregar un nuevo producto
viewsRouter.post('/productos', async (req, res) => {
  try {
    const product = {
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      category: req.body.category,
      thumbnails: req.body.thumbnails,
      status: true  // Valor por defecto de status
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

