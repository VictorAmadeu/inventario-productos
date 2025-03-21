/**
 * Módulo de funciones para el manejo del inventario de productos.
 * @module funciones
 */

/**
 * Array que almacena los productos.
 * @type {Array<Object>}
 */
let productos = [];

/**
 * Retorna el array actual de productos.
 * @returns {Array<Object>} El array de productos.
 */
function getProductos() {
  return productos;
}

/**
 * Reinicia el array de productos (útil para pruebas unitarias).
 */
function resetProductos() {
  productos = [];
}

/**
 * Agrega un nuevo producto o edita uno existente en el array.
 *
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio del producto (puede tener decimales).
 * @param {number} cantidad - Cantidad en inventario.
 * @param {number|null} [indiceEdicion=null] - Índice del producto a editar; si es null, se agrega un producto nuevo.
 * @returns {Object} El producto agregado o actualizado.
 */
function guardarProducto(nombre, precio, cantidad, indiceEdicion = null) {
  const producto = { nombre, precio, cantidad };

  if (indiceEdicion === null) {
    // Agregar nuevo producto.
    productos.push(producto);
  } else {
    // Editar producto existente.
    productos[indiceEdicion] = producto;
  }
  return producto;
}

/**
 * Elimina un producto del array según su índice.
 *
 * @param {number} index - Índice del producto a eliminar.
 */
function eliminarProducto(index) {
  productos.splice(index, 1);
}

/**
 * Filtra los productos cuyo nombre contenga el texto buscado (sin distinguir mayúsculas/minúsculas).
 *
 * @param {string} busqueda - Texto a buscar.
 * @returns {Array<Object>} Array con los productos que coinciden.
 */
function filtrarProductos(busqueda) {
  const texto = busqueda.toLowerCase().trim();
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(texto)
  );
}

// Exportamos las funciones para poder utilizarlas en otros módulos y en las pruebas unitarias.
module.exports = {
  getProductos,
  resetProductos,
  guardarProducto,
  eliminarProducto,
  filtrarProductos,
};
