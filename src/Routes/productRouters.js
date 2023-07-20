const express = require('express');
const productRouter = express.Router();
const ProductManager = require('../../components/ProductManager');
const { generateId } = require('../../components/Helpers');
const multer = require('multer');
const path = require('path');

const manager = new ProductManager('../productos.json');

// Configuración de Multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extname; // Nombre de archivo único para evitar colisiones
    cb(null, filename);
  }
});

const upload = multer({ storage });

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

// Crear un nuevo producto
productRouter.post("/", upload.array('thumbnails', 5), async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const thumbnails = req.files.map(file => file.filename);

    const newProduct = {
      id: generateId(), // Aquí usamos la función generateId() para obtener un nuevo ID único.
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails
    };

    await manager.addProduct(newProduct);

    res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Actualizar un producto por ID
productRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    const success = await manager.updateProduct(id, updatedProduct);
    if (success) {
      res.json({ message: 'Producto actualizado exitosamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto por ID
productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const success = await manager.deleteProduct(id);
    if (success) {
      res.json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = productRouter;


























