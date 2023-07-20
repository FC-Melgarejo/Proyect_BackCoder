const socketIOClient = require('socket.io-client');

document.addEventListener('DOMContentLoaded', () => {
  const socket = socketIOClient(); // Conectar al servidor socket.io

  socket.on('connect', () => {
    console.log('Conectado al servidor socket.io');
  });

  socket.on('disconnect', () => {
    console.log('Desconectado del servidor socket.io');
  });

  // Evento para recibir la notificación de producto agregado
  socket.on('newProduct', (product) => {
    const parsedProduct = JSON.parse(product);
    const productList = document.getElementById('productList');
    const newProductItem = document.createElement('li');
    newProductItem.textContent = `${parsedProduct.id} - ${parsedProduct.title} - ${parsedProduct.price}`;
    productList.appendChild(newProductItem);
  });

  // Evento para recibir la notificación de producto eliminado (si lo implementas)
  socket.on('productDeleted', (data) => {
    // Lógica para eliminar el producto de la lista (si lo implementas)
  });

  const createProductForm = document.getElementById('createProductForm');
  createProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(createProductForm);
    const productData = {
      title: formData.get('title'),
      description: formData.get('description'),
      code: formData.get('code'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      category: formData.get('category'),
    };

    try {
      socket.emit('addProduct', productData); // Enviar los datos del producto a través de WebSockets
      createProductForm.reset(); // Reinicia el formulario después de enviar los datos
    } catch (error) {
      console.error('Error de red:', error);
    }
  });
});
socket.on('productDeleted', (productId) => {
  // Lógica para eliminar el producto de la tabla
  const productRow = document.getElementById(`product-${productId}`);
  if (productRow) {
    productRow.remove();
  }
});

