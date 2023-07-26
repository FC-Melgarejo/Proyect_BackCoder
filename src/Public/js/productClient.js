 <script src="/socket.io/socket.io.js"></script>

    const socket = io();

    socket.on('connect', () => {
      console.log('Conexión establecida con el servidor WebSocket');
    });

 // En productClient.js
document.addEventListener('DOMContentLoaded', () => {
  // Obtener el formulario de creación de producto por su ID
  const createProductForm = document.getElementById('createProductForm');

  // Escuchar el evento 'submit' del formulario
  createProductForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los datos del formulario
    const formData = new FormData(createProductForm);

    try {
      // Enviar los datos del formulario al servidor utilizando una solicitud POST
      const response = await fetch('/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Si la solicitud fue exitosa, mostrar un mensaje de éxito utilizando SweetAlert2
        Swal.fire('Producto agregado', 'El producto ha sido agregado con éxito', 'success');
        createProductForm.reset(); // Limpiar el formulario después de agregar el producto
      } else {
        // Si la solicitud no fue exitosa, mostrar un mensaje de error utilizando SweetAlert2
        Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');
      }
    } catch (error) {
      console.log('Error:', error);
      Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');
    }
  });
});
function deleteProduct(productId) {
  fetch(`/products/${productId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        // Si la solicitud fue exitosa, realizar acciones adicionales o mostrar un mensaje
        console.log('Producto eliminado correctamente');
        // Por ejemplo, podrías mostrar una notificación o actualizar la vista después de la eliminación
        // window.location.reload(); // Esto recarga la página para reflejar los cambios en la vista
      } else {
        // Si la solicitud no fue exitosa, mostrar un mensaje de error
        console.error('Error al eliminar el producto:', response.statusText);
        // Puedes mostrar una notificación o mensaje de error aquí en caso de que ocurra algún problema durante la eliminación
      }
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}
// Seleccionar todos los botones de eliminar por su clase
  const deleteProductButtons = document.querySelectorAll('.delete-product-btn');

  // Agregar event listener a cada botón de eliminar
  deleteProductButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      event.preventDefault();

      // Obtener el ID del producto desde el atributo 'data-product-id' del botón
      const productId = button.dataset.productId;

      try {
        // Llamamos a la función deleteProduct que hace la solicitud DELETE al servidor
        deleteProduct(productId);
      } catch (error) {
        console.error('Error:', error);
        // Puedes mostrar una notificación o mensaje de error aquí en caso de que ocurra algún problema durante la eliminación
        Swal.fire('Error', 'Hubo un problema al eliminar el producto', 'error');
      }
    });
  });







function deleteProduct(productId) {
  fetch(`/products/${productId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      if (response.ok) {
        // Si la solicitud fue exitosa, mostrar un mensaje de éxito utilizando SweetAlert2
        Swal.fire('Producto eliminado', 'El producto ha sido eliminado con éxito', 'success');
        // Puedes realizar alguna acción adicional aquí después de eliminar el producto
      } else {
        // Si la solicitud no fue exitosa, mostrar un mensaje de error utilizando SweetAlert2
        Swal.fire('Error', 'Hubo un problema al eliminar el producto', 'error');
      }
      
     // Debería mostrar { "success": true }
      // Redireccionar al catálogo después de eliminar el producto
      window.location.href = '/index';
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}


    // Restablecer el formulario después de agregar un producto
    socket.on('productAddedSuccess', () => {
      console.log('Producto agregado correctamente');
      document.querySelector('#createProductForm').reset();
    });
    socket.on('disconnect', () => {
      console.log('Conexión perdida con el servidor WebSocket');
    });
  
  <script src="js/productClient.js"></script>;
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.js"></script>








