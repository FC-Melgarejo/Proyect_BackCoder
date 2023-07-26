const express = require('express');
const productRouter = express.Router();
const ProductManager = require('../../components/ProductManager');
const { generateId } = require('../helpers');
const path = require('path');
const multer = require('multer');

const manager = new ProductManager('../products.json');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extname;
    cb(null, filename);
  }
});

const upload = multer({ storage });

productRouter.get('/', (req, res) => {
  res.send({ status: "success", payload: product });
});

// Obtener todos los productos
productRouter.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    let products = await manager.getProducts();

    if (limit) {
      products = products.slice(0, parseInt(limit));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Obtener un producto por ID
productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await manager.getProductById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Ruta para agregar un nuevo producto
productRouter.post('/products', upload.single('thumbnails'), (req, res) => {
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

  // Emitir evento de socket.io para notificar que se agregó un producto
  req.io.emit('productAdded', 'Nuevo producto agregado');

  res.json(productData);
});

// Ruta para eliminar un producto
productRouter.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  try {
    manager.deleteProduct(productId);
    // Emitir evento de socket.io para notificar que se eliminó un producto
    req.io.emit('productDeleted', productId);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});


module.exports = (io) => {
  // Agrega el middleware de Socket.IO antes de devolver el router
  productRouter.use((req, res, next) => {
    req.io = io;
    next();
  });

  return productRouter;
};







































