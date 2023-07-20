const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const ProductManager = require('../components/ProductManager');
const multer = require('multer');
const { generateId } = require('../components/Helpers');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de multer para manejar la carga de imágenes
const upload = multer({ dest: 'Public/uploads/' }); // Directorio donde se guardarán las imágenes

// Crear una instancia de ProductManager y pasarla al ViewsRouter
const manager = new ProductManager('./products.json');

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Importar el enrutador viewsRouter y pasar los argumentos (io, manager, upload)
const viewsRouter = require('./Routes/viewsRouter');

// Agregar el viewsRouter como middleware
app.use(express.static(path.join(__dirname, 'Public')));
app.set('views', path.join(__dirname, 'views'));
app.use('/', viewsRouter(io,manager,upload));

// Escuchar el evento "connection" desde el cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('addProduct', (data) => {
    try {
      const productId = manager.addProduct(data);
      const newProduct = manager.getProductById(productId);
      io.emit('newProduct', JSON.stringify(newProduct));
    } catch (error) {
      console.log('Error al agregar el producto:', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor y el socket.io
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});


























// const http = require('http');
// const express = require('express');
// const exphbs = require('express-handlebars').create();
// const productRouter = require('./Routes/productRouters');
// const cartRouter = require('./Routes/CartRouters');
// const ProductManager = require('../components/ProductManager');

// const manager = new ProductManager('../productos.json');

// const app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rutas
// app.use('/api/products', productRouter);
// app.use('/api/carts', cartRouter);

// app.get('/', (req, res) => {
//   res.render('home'); // Renderiza la vista 'home.handlebars'
// });

// app.get('/realtimeproducts', (req, res) => {
//   res.render('realTimeProducts'); // Renderiza la vista 'realTimeProducts.handlebars'
// });

// const server = http.createServer(app);
// io.attach(server);

// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   socket.on('createProduct', (productData) => {
//     // Lógica para crear el producto
//     // ...

//     socket.emit('productAdded', { productId }); // Enviar una notificación de producto agregado
//   });

//   socket.on('deleteProduct', (productId) => {
//     // Lógica para eliminar el producto
//     // ...

//     socket.emit('productDeleted', { productId }); // Enviar una notificación de producto eliminado
//   });
// });
// const port = 8080; // Puerto en el que se ejecutará el servidor HTTP
// server.listen(port, () => {
//   console.log(`Servidor HTTP escuchando en el puerto ${port}`);
// });
























// const http = require('http');
// const express = require('express');
// const exphbs = require('express-handlebars').create();
// const productRouter = require('./Routes/productRouters');
// const cartRouter = require('./Routes/CartRouters');
// const ProductManager = require('../components/ProductManager');

// const manager = new ProductManager('../productos.json');

// const app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rutas
// app.use('/api/products', productRouter);
// app.use('/api/carts', cartRouter);

// app.get('/', (req, res) => {
//   res.render('home'); // Renderiza la vista 'home.handlebars'
// });

// app.get('/realtimeproducts', (req, res) => {
//   res.render('realTimeProducts'); // Renderiza la vista 'realTimeProducts.handlebars'
// });

// const server = http.createServer(app);
// io.attach(server);

// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   socket.on('createProduct', (productData) => {
//     // Lógica para crear el producto
//     // ...

//     socket.emit('productAdded', { productId }); // Enviar una notificación de producto agregado
//   });

//   socket.on('deleteProduct', (productId) => {
//     // Lógica para eliminar el producto
//     // ...

//     socket.emit('productDeleted', { productId }); // Enviar una notificación de producto eliminado
//   });
// });
// const port = 8080; // Puerto en el que se ejecutará el servidor HTTP
// server.listen(port, () => {
//   console.log(`Servidor HTTP escuchando en el puerto ${port}`);
// });























// const http = require('http');
// const express = require('express');
// const exphbs = require('express-handlebars').create();
// const productRouter = require('./Routes/productRouters');
// const cartRouter = require('./Routes/CartRouters');
// const ProductManager = require('../components/ProductManager');

// const manager = new ProductManager('../productos.json');

// const app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rutas
// app.use('/api/products', productRouter);
// app.use('/api/carts', cartRouter);

// app.get('/', (req, res) => {
//   res.render('home'); // Renderiza la vista 'home.handlebars'
// });

// app.get('/realtimeproducts', (req, res) => {
//   res.render('realTimeProducts'); // Renderiza la vista 'realTimeProducts.handlebars'
// });

// const server = http.createServer(app);
// io.attach(server);

// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   socket.on('createProduct', (productData) => {
//     // Lógica para crear el producto
//     // ...

//     socket.emit('productAdded', { productId }); // Enviar una notificación de producto agregado
//   });

//   socket.on('deleteProduct', (productId) => {
//     // Lógica para eliminar el producto
//     // ...

//     socket.emit('productDeleted', { productId }); // Enviar una notificación de producto eliminado
//   });
// });
// const port = 8080; // Puerto en el que se ejecutará el servidor HTTP
// server.listen(port, () => {
//   console.log(`Servidor HTTP escuchando en el puerto ${port}`);
// });
