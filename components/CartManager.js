const fs = require('fs');

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path || '../src/data/carts.json';

    console.log("Path del archivo:", this.path);
    if (fs.existsSync(this.path)) {
      console.log('El archivo de carritos existe en la ruta:', this.path);
      this.loadCarts();
    } else {
      console.log('El archivo de carritos no existe en la ruta:', this.path);
    }
  }

  createCart() {
    const newCart = {
      id: this.generateUniqueId(),
      products: []
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (!cart) {
      console.log("Carrito no encontrado.");
      return;
    }

    const existingProduct = cart.products.find((product) => product.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    console.log("Producto agregado al carrito correctamente.");
    this.saveCarts();
  }

  getAllCarts() {
    return this.carts;
  }

  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.carts = JSON.parse(data);
      console.log('Carritos cargados correctamente:', this.carts);
    } catch (error) {
      console.error('Error al cargar los carritos:', error);
    }
  }

  saveCarts() {
    try {
      const jsonCarts = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync(this.path, jsonCarts);
      console.log('Carritos guardados exitosamente.');
    } catch (error) {
      console.error('Error al guardar los carritos:', error);
    }
  }
}

module.exports = CartManager;


