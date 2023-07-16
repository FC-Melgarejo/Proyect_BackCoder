const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create();
const multer = require('multer');
const fs = require('fs');



const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const productRouter = require('./Routes/productRouters');
const CartRouter = require('./Routes/CartRouters');
const ProductManager = require('../components/ProductManager');
const viewsRouter = require('./Routes/ViewsRouters');
const realTimeProductRouter = require('./Routes/realTimeProductRouter');

const manager = new ProductManager('../productos.json');

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configuración de multer para manejar la carga de imágenes
const upload = multer({ dest: '/src/Public/uploads' }); // Directorio donde se guardarán las imágenes

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRouter); // Ruta para las operaciones de productos
app.use('/api/carts', CartRouter); // Ruta para las operaciones de carritos
app.use('/', viewsRouter); // Ruta para las vistas



// Ruta para manejar la carga de imágenes desde el formulario
app.post('/productos', upload.single('thumbnails'), (req, res) => {
  try {
    // Aquí puedes acceder a los datos del formulario (req.body) y la información del archivo cargado (req.file)
    const formData = req.body;
    const imageFile = req.file;

    // Procesa la información y guarda la imagen en la ubicación que desees
    // Por ejemplo, podrías mover el archivo a una carpeta de "uploads" y guardar el nombre del archivo en tu base de datos
    if (imageFile) {
      // Obtén el nombre original del archivo cargado
      const originalFileName = imageFile.originalname;

      // Define la ubicación donde se guardará el archivo de imagen
      const uploadPath = path.join(__dirname, 'Public/uploads/', originalFileName);

      // Mueve el archivo a la ubicación deseada
      fs.renameSync(imageFile.path, uploadPath);

      // Guarda el nombre del archivo de imagen en la base de datos o realiza otras acciones necesarias
      // ...

      // Envía una respuesta adecuada al cliente
      res.status(200).json({ message: 'Imagen cargada correctamente.' });
    } else {
      // Si no se cargó ninguna imagen
      res.status(400).json({ error: 'Debe cargar una imagen.' });
    }
  } catch (error) {
    // Si ocurre algún error durante el proceso de carga y almacenamiento de la imagen
    res.status(500).json({ error: 'Error al cargar la imagen.' });
  }
  const imageName = req.file.filename;
  console.log('Nombre del archivo cargado:', imageName);
});

  

  // Resto del código para guardar el nombre de la imagen en la base de datos u otras acciones necesarias


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
