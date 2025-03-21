// Importamos las funciones del módulo funciones.js
const {
  getProductos,
  resetProductos,
  guardarProducto,
  eliminarProducto,
  filtrarProductos,
} = require("../funciones");


describe("Pruebas de funciones del inventario", () => {
  // Reiniciamos el array de productos antes de cada prueba.
  beforeEach(() => {
    resetProductos();
  });

  test("guardarProducto agrega un nuevo producto", () => {
    guardarProducto("Mesa", 100.5, 5);
    const prods = getProductos();
    expect(prods.length).toBe(1);
    expect(prods[0]).toEqual({ nombre: "Mesa", precio: 100.5, cantidad: 5 });
  });

  test("guardarProducto edita un producto existente", () => {
    guardarProducto("Silla", 50, 10);
    // Editar el producto en el índice 0
    guardarProducto("Silla Actualizada", 55, 12, 0);
    const prods = getProductos();
    expect(prods.length).toBe(1);
    expect(prods[0]).toEqual({
      nombre: "Silla Actualizada",
      precio: 55,
      cantidad: 12,
    });
  });

  test("eliminarProducto elimina correctamente un producto", () => {
    guardarProducto("Mesa", 100, 5);
    guardarProducto("Silla", 50, 10);
    eliminarProducto(0);
    const prods = getProductos();
    expect(prods.length).toBe(1);
    expect(prods[0].nombre).toBe("Silla");
  });

  test("filtrarProductos filtra los productos por nombre", () => {
    guardarProducto("Mesa", 100, 5);
    guardarProducto("Silla", 50, 10);
    guardarProducto("Monitor", 200, 2);
    const filtrados = filtrarProductos("si");
    expect(filtrados.length).toBe(1);
    expect(filtrados[0].nombre).toBe("Silla");
  });
});
