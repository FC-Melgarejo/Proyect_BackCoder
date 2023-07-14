const express = require('express');
const homeRouter = express.Router();
const ProductManager = require('../../components/ProductManager');

const manager = new ProductManager('../productos.json');

// Ruta para obtener la lista de productos y mostrarlos en la página de inicio
homeRouter.get('/', async (req, res) => {
  try {
    const products = await manager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

module.exports = homeRouter;
