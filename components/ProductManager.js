const fs = require('fs');
const { generateId } = require('./Helpers');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.loadProducts();
  }

  addProduct(data) {
    try {
      const newId = this.generateId(); // Generar el siguiente ID numérico secuencial

      const newProduct = {
        id: newId,
        title: data.title,
        description: data.description,
        code: data.code,
        price: data.price,
        status: data.status ?? true,
        stock: data.stock ?? 1,
        category: data.category,
        thumbnails: data.thumbnails ?? [],
      };

      this.products.push(newProduct);
      this.saveProducts();

      console.log('Producto agregado correctamente');
      return newProduct.id;
    } catch (error) {
      console.log('Error al agregar el producto:', error.message);
      throw error;
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  generateId() {
    const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    return lastProductId + 1;
  }

  loadProducts() {
    try {
      const productsData = fs.readFileSync(this.filePath, 'utf8');
      this.products = JSON.parse(productsData);
      console.log('Productos cargados correctamente:', this.products);
    } catch (err) {
      console.error('Error al cargar los productos:', err);
    }
  }

  saveProducts() {
    try {
      const jsonProducts = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.filePath, jsonProducts);
      console.log('Productos guardados exitosamente.');
    } catch (error) {
      console.error('Error al guardar los productos:', error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      // Buscar el producto en los datos JSON y eliminarlo
      const updatedProducts = products.filter((product) => product.id !== productId);

      // Guardar los productos actualizados de vuelta al archivo JSON
      fs.writeFileSync('/json/file.json', JSON.stringify(updatedProducts, null, 2));

      // Eliminar el archivo de imagen asociado de la carpeta "uploads"
      const product = products.find((product) => product.id === productId);
      if (product) {
        fs.unlinkSync(`/uploads/folder/${product.thumbnails}`);
      }

      // Devolver un resultado exitoso o lanzar un error si algo sale mal
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }
}

module.exports = ProductManager; 













// notifyNewProduct(product) {
//   io.emit('newProduct', JSON.stringify(product));
// }





