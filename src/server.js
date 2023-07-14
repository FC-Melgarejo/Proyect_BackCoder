const http = require('http');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create();
const socketIO = require('socket.io');
const productRouter = require('./Routes/productRouters');
const cartRouter = require('./Routes/CartRouters');
const ProductManager = require('../components/ProductManager');
const homeRouter = require('./Routes/homeRouter');
const realTimeProductRouter = require('./Routes/realTimeProductRouter');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const manager = new ProductManager('../productos.json', io);

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', homeRouter);

app.use('/realtimeproduct', realTimeProductRouter);


app.get('/', (req, res) => {
  res.render('home'); // Renderiza la vista 'home.handlebars'
});
app.get('/realtimeproduct', (req, res) => {
  // Aquí puedes realizar las operaciones necesarias para mostrar la página de realtimeproduct

  // Por ejemplo, puedes renderizar un archivo HTML utilizando un motor de plantillas como Handlebars o EJS
  res.render('realtimeproduct', { title: 'Página de realtimeproduct' });

  // O puedes enviar una respuesta JSON con los datos necesarios
  const data = {
    title: 'Página de realtimeproduct',
    message: 'Bienvenido a la página de realtimeproduct'
  };
  res.json(data);
});
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts'); // Renderiza la vista 'realTimeProducts.handlebars'
});

io.on('connection', (socket) => {
  socket.on('createProduct', (productData) => {
    const productId = manager.addProduct(productData);
    io.emit('productAdded', { productId });
  });

  socket.on('deleteProduct', (productId) => {
    manager.deleteProduct(productId);
    io.emit('productDeleted', { productId });
  });
});

const port = 8080; // Puerto en el que se ejecutará el servidor HTTP
server.listen(port, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${port}`);
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
