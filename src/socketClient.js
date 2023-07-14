const socketIOClient = require('socket.io-client');

function startSocketClient() {
  const socket = socketIOClient('http://localhost:8080');

  // Evento para recibir la notificación de producto agregado
  socket.on('productAdded', (data) => {
    console.log('Producto agregado:', data.productId);
  });

  // Evento para recibir la notificación de producto eliminado
  socket.on('productDeleted', (data) => {
    console.log('Producto eliminado:', data.productId);
  });
}

module.exports = {
  startSocketClient
};
