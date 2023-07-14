const socket = io();

socket.on('productAdded', (data) => {
  console.log('Producto agregado:', data);

  // Actualiza la interfaz de usuario para reflejar el cambio en la lista de productos
});

socket.on('productDeleted', (data) => {
  console.log('Producto eliminado:', data);

  // Actualiza la interfaz de usuario para reflejar el cambio en la lista de productos
});
const createProductForm = document.getElementById('createProductForm');
createProductForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que se realice la petición HTTP por defecto

  const formData = new FormData(createProductForm);
  const productData = Object.fromEntries(formData.entries());

  socket.emit('createProduct', productData); // Enviar los datos del producto a través de WebSockets
});

