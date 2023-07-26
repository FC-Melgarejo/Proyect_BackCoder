// Helpers.js

function generateId() {
  const timestamp = Date.now().toString(); // Obtener la marca de tiempo actual en milisegundos
  const random = Math.random().toString().substring(2, 8); // Generar un número aleatorio de 6 dígitos

  return `${timestamp}-${random}`; // Combinar la marca de tiempo y el número aleatorio como ID único
}

module.exports = {
  generateId
};
