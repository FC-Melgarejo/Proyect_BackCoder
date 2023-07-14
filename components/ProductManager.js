const fs = require('fs');
const { generateId } = require('./Helpers');

class ProductManager {
    constructor(path, socketServer) {
        this.products = [];
        this.path = path;
        this.socketServer = socketServer;

        console.log("Path del archivo:", this.path);
        if (fs.existsSync(this.path)) {
            console.log('El archivo de productos existe en la ruta:', this.path);
        } else {
            console.log('El archivo de productos no existe en la ruta:', this.path);
        }

        this.loadProducts();
    }

    async addProduct(data) {
        try {
            await this.getProducts();

            if (
                !data.title ||
                !data.description ||
                !data.code ||
                !data.price ||
                !data.status ||
                !data.stock ||
                !data.category
            ) {
                throw new Error('Todos los campos son obligatorios');
            }

            const exist = this.products.find((product) => product.code === data.code);
            if (exist) {
                throw new Error(`Ya existe un producto con el código '${data.code}'`);
            }

            const newId = this.generateNextId(); // Generar el siguiente ID numérico secuencial

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
            const productData = {
                title,
                description,
                price,
                thumbnails: [thumbnails] // Ten en cuenta que el parámetro 'thumbnails' es una sola imagen, por lo que debes envolverlo en un array
              };
              
              manager.addProduct(productData);
              

            this.products.push(newProduct);
            this.saveProducts();

            console.log('Producto agregado correctamente');
            return newProduct.id;
        } catch (error) {
            console.log('Error al agregar el producto:', error);
            throw error;
        }
    }

    generateNextId() {
        const lastProduct = this.products[this.products.length - 1];
        if (lastProduct) {
            // Obtener el último ID numérico y agregar 1 para el siguiente ID
            return parseInt(lastProduct.id) + 1;
        } else {
            // Si no hay productos existentes, comenzar en 1
            return 1;
        }
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const productIndex = this.products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updatedProduct
        };

        await this.saveProducts();

        console.log('Producto actualizado');
        return true;
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products.splice(productIndex, 1);
        await this.saveProducts();

        console.log('Producto eliminado');
        return true;
    }

    async loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            console.log('Productos cargados correctamente:', this.products);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    async saveProducts() {
        try {
            const jsonProducts = JSON.stringify(this.products, null, 2);
            fs.writeFileSync('./productos.json', jsonProducts);
            console.log('Productos guardados exitosamente.');
        } catch (error) {
            console.error('Error al guardar los productos:', error);
        }
    }
}

module.exports = ProductManager;








