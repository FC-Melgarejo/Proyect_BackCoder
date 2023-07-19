const socketIO = require('socket.io');

const initSocketServer = (server, manager) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Cuando un cliente se conecta, enviaremos la lista de productos actual
    const products = manager.getProducts();
    socket.emit('products', JSON.stringify(products));

    socket.on('addProduct', (data) => {
      const productId = manager.addProduct(data);
      const newProduct = manager.getProductById(productId);
      io.emit('newProduct', JSON.stringify(newProduct));
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};

module.exports = initSocketServer;










