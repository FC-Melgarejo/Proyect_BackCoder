// Conectar al servidor socket.io
const socket = io();

// Escucha el evento 'productAdded' cuando se agrega un nuevo producto
socket.on('productAdded', (data) => {
  console.log('Producto agregado:', data);

  // Actualiza la interfaz de usuario para reflejar el cambio en la lista de productos
  const productList = document.getElementById('productList');

  // Crear un nuevo elemento <li> con los detalles del producto agregado
  const newProductItem = document.createElement('li');
  newProductItem.textContent = `${data.title} - ${data.description}`;

  // Agregar el nuevo elemento a la lista de productos
  productList.appendChild(newProductItem);
});

// Escucha el evento 'productDeleted' cuando se elimina un producto
socket.on('productDeleted', (data) => {
  console.log('Producto eliminado:', data);

  // Actualiza la interfaz de usuario para reflejar el cambio en la tabla de productos
  const productRow = document.querySelector(`tr[data-id="${data.id}"]`);
  if (productRow) {
    productRow.remove();
  }
});

// Agregar evento para el formulario de creación de productos
const createProductForm = document.getElementById('createProductForm');
createProductForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que se realice la petición HTTP por defecto

  const formData = new FormData(createProductForm);
  const productData = Object.fromEntries(formData.entries());

  // Enviar los datos del producto a través de WebSockets con el evento 'createProduct'
  socket.emit('createProduct', productData);
});

// Evento para el botón de eliminar
// Agregar un evento click al botón de eliminar
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-delete')) {
    const productId = event.target.getAttribute('data-id');

    // Realizar una solicitud para eliminar el producto al servidor
    fetch(`/productos/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // El producto ha sido eliminado en el servidor
        // Actualizar la vista en el cliente si es necesario
        // Por ejemplo, puedes recargar la página o actualizar la lista de productos
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  }
});

  
  // Agregar lo siguiente para mostrar una notificación de SweetAlert
  Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: 'El producto ha sido agregado exitosamente.',
  }).then(() => {
    // Recarga la página después de mostrar la notificación
    window.location.reload();
  });

  createProductForm.reset(); // Reinicia el formulario después de enviar los datos


