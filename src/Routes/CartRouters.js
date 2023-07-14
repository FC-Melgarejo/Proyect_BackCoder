const express = require('express');
const cartRouter = express.Router();

const CartManager = require('../../components/CartManager');
const manager = new CartManager();

cartRouter.get("/", async (req, res) => {
  const carts = manager.getAllCarts();
  return res.send(carts);
});

cartRouter.get("/:cartId", async (req, res) => {
  const cartId = req.params.cartId;

  const cart = manager.getCartById(cartId);

  if (!cart) {
    return res.status(404).json({
      error: "Cart not found",
    });
  }

  return res.send(cart);
});

cartRouter.post("/", (req, res) => {
  const cart = manager.createCart();

  return res.status(201).json(cart);
});

cartRouter.post("/:cartId/product/:productId", (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;
  const quantity = req.body.quantity || 1;

  const cart = manager.getCartById(cartId);
  socket.emit('productAdded', { cartId, productId }); // Enviar una notificación de producto agregado


  if (!cart) {
    return res.status(404).json({
      error: "Cart not found",
    });
  }

  const existingProduct = cart.products.find((product) => product.id === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ id: productId, quantity });
  }

  return res.json({
    message: "Product added to cart successfully",
  });
});

module.exports = cartRouter;





