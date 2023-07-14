const fs = require('fs');

class CartManager {
  // ...

  addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = this.getCartById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado.");
      }

      const existingProduct = cart.products.find((product) => product.id === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }

      console.log("Producto agregado al carrito correctamente.");
      this.saveCarts();
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error.message);
    }
  }

  // ...

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.carts = JSON.parse(data);
      console.log('Carritos cargados correctamente:', this.carts);
    } catch (error) {
      console.error('Error al cargar los carritos:', error.message);
    }
  }

  saveCarts() {
    try {
      const jsonCarts = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync(this.path, jsonCarts);
      console.log('Carritos guardados exitosamente.');
    } catch (error) {
      console.error('Error al guardar los carritos:', error.message);
    }
  }

  // ...
}

module.exports = CartManager;



