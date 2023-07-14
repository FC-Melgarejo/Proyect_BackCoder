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
    // Agrega aquí más campos según tus necesidades
    // campo1: formData.get('campo1'),
    // campo2: formData.get('campo2'),
    // ...
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
      console.log('Producto creado:', data.product);
      
      // Emitir un evento al servidor socket.io
      const socket = io(); // Conectar al servidor socket.io
      socket.emit('createProduct', data.product); // Emitir el evento 'createProduct' con los datos del producto
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

