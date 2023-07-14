const express = require('express');
const cartRouter = express.Router();

const CartManager = require('../../components/CartManager');
const manager = new CartManager();

cartRouter.get("/", async (req, res) => {
  try {
    const carts = manager.getAllCarts();
    return res.send(carts);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los carritos",
    });
  }
});

cartRouter.get("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;

  try {
    const cart = manager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({
        error: "Carrito no encontrado",
      });
    }

    return res.send(cart);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener el carrito",
    });
  }
});

cartRouter.post("/", (req, res) => {
  try {
    const cart = manager.createCart();
    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el carrito",
    });
  }
});

cartRouter.post("/:cartId/product/:productId", (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  const quantity = req.body.quantity || 1;

  try {
    const cart = manager.getCartById(cartId);

    if (!cart) {
      return res.status(404).json({
        error: "Carrito no encontrado",
      });
    }

    const existingProduct = cart.products.find((product) => product.id === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    return res.json({
      message: "Producto agregado al carrito correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error al agregar el producto al carrito",
    });
  }
});

module.exports = cartRouter;






