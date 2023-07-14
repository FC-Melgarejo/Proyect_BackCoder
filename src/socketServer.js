const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
const server = app.listen(8080, () => {
  console.log('Servidor HTTP escuchando en el puerto 8080');
});

const io = new Server(server);

// Configuración de Multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/data/productos.json')
    
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extname; // Nombre de archivo único para evitar colisiones
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Ruta para procesar la creación del producto en tiempo real
app.post('/realtimeproducts', upload.array('thumbnails', 5), (req, res) => {
  try {
    const { title, description, price, code, category, status } = req.body;
    const thumbnails = req.files.map(file => file.filename);

    // Verificar si se proporcionan los campos requeridos del producto
    if (!title || !description || !price || !thumbnails || !code || !category || !status) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Crear un nuevo producto con un ID único
    const newProductId = generateProductId();
    const newProduct = {
      id: newProductId,
      title,
      description,
      price,
      thumbnails,
      code,
      category,
      status,
      // Resto de los campos del producto
    };

    // Guardar el nuevo producto en el archivo JSON
    saveProduct(newProduct);

    // Emitir el evento 'productAdded' a todos los clientes conectados
    io.emit('productAdded', newProduct);

    // Enviar una respuesta exitosa
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Generar un ID único para los productos
function generateProductId() {
  // Obtener los productos existentes desde el archivo JSON
  const products = loadProducts();

  // Generar un nuevo ID numérico único a partir del último ID existente
  const lastProductId = products.length > 0 ? parseInt(products[products.length - 1].id) : 0;
  const newProductId = lastProductId + 1;

  return newProductId.toString();
}

// Guardar un producto en el archivo JSON
function saveProduct(product) {
  // Obtener los productos existentes desde el archivo JSON
  const products = loadProducts();

  // Agregar el nuevo producto al array de productos
  products.push(product);

  // Escribir los productos actualizados en el archivo JSON
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
}

// Cargar los productos desde el archivo JSON
function loadProducts() {
  // Leer el contenido del archivo JSON
  const fileContent = fs.readFileSync('products.json', 'utf8');

  // Convertir el contenido a un array de objetos JSON
  const products = JSON.parse(fileContent);

  return products;
}

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('addProduct', (productData) => {
    const { title, description, price, thumbnails, code, category, status } = productData;

    // Procesa las imágenes utilizando el middleware de Multer
    upload.array('thumbnails')(socket.request, socket.request.res, (error) => {
      if (error) {
        console.error(error);
        socket.emit('productError', 'Error al cargar las imágenes');
        return;
      }

      // Obtiene los nombres de archivo generados por Multer
      const thumbnailFilenames = socket.request.files.map((file) => file.filename);

      // Crea un objeto que contiene los datos del producto, incluyendo los nombres de archivo de las imágenes
      const newProduct = {
        title,
        description,
        price,
        thumbnails: thumbnailFilenames,
        code,
        category,
        status,
        // Resto de los campos del producto
      };

      // Guarda el producto en la base de datos o realiza las operaciones necesarias
      // ...

      // Emitir un evento para informar a los clientes sobre el nuevo producto
      io.emit('productAdded', newProduct);
    });
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});








