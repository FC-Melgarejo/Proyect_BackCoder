const { Server } = require('socket.io'); // Asegúrate de importar Server desde socket.io
const ProductManager = require('../components/ProductManager');
const express = require('express');

function setupSocket(httpServer, manager) {
  const io = new Server(httpServer);
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('mi_mensaje', (data) => {
      console.log(data);
    });

    socket.on('createProduct', (product) => {
      try {
        const productId = manager.addProduct(product);
        const newProduct = manager.getProductById(productId);
        io.emit('productAdded', newProduct);
        io.emit('productAddedSuccess');
        // Emitir el evento 'productAdded' con el nuevo producto
      } catch (error) {
        console.log('Error al agregar el producto:', error.message);
      }
    });

    productRouter.delete('/products/:id', (req, res) => {
      const productId = req.params.id;
      try {
        manager.deleteProduct(productId);
        // Emitir evento de socket.io para notificar que se eliminó un producto
        io.emit('productDeleted', productId);
        res.json({ message: 'Producto eliminado exitosamente' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  return io;

}

module.exports = setupSocket;




