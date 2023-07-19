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
    const response = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Producto creado:', data.products);
      
      // Emitir un evento al servidor socket.io
      const socket = io(); // Conectar al servidor socket.io
      socket.emit('createProduct', data.products); // Emitir el evento 'createProduct' con los datos del producto
    } else {
      console.error('Error al crear el producto:', response.statusText);
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
});

function createProduct(event) {
  event.preventDefault(); // Evita que se realice la petición HTTP por defecto

  const createProductForm = document.getElementById('createProductForm');
  const formData = new FormData(createProductForm);
  const productData = Object.fromEntries(formData.entries());

  const socket = io(); // Conectar al servidor socket.io
  socket.emit('createProduct', productData); // Enviar los datos del producto a través de WebSockets

  createProductForm.reset(); // Reinicia el formulario después de enviar los datos
}


    const socket = io();

    socket.on('newProduct', (product) => {
      const parsedProduct = JSON.parse(product);
      const productList = document.getElementById('productList');
      const newProductItem = document.createElement('li');
      newProductItem.textContent = `${parsedProduct.id} - ${parsedProduct.title} - ${parsedProduct.price}`;
      productList.appendChild(newProductItem);
    });
    // Después de esta línea, donde emites el evento 'newProduct'
res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });

// Agrega lo siguiente para mostrar una notificación de SweetAlert
Swal.fire({
  icon: 'success',
  title: '¡Éxito!',
  text: 'El producto ha sido agregado exitosamente.',
}).then(() => {
  // Recarga la página después de mostrar la notificación
  window.location.reload();
});

 

