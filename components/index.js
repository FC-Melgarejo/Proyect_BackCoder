class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Todos los campos son obligatorios.");
      return;
    }

    // Validar que no se repita el campo "code"
    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      console.log(`Error: El producto con código ${code} ya existe.`);
      return;
    }

    // Obtener el último id autoincrementable o asignar 1 si no hay productos
    const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    const newProductId = lastProductId + 1;

    // Crear el nuevo producto y agregarlo al arreglo de productos
    const newProduct = {
      id: newProductId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    this.products.push(newProduct);
    console.log("Producto agregado exitosamente.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const manager = new ProductManager();
manager.addProduct("Camiseta", "Camiseta de algodón", 20, "/images/camiseta.jpg", "C001", 10);
manager.addProduct("Pantalón", "Pantalón de mezclilla", 30, "/images/pantalon.jpg", "P002", 5);
console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));
