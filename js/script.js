/*************************************************************
 * ✅ Array principal donde almacenamos los productos
 *************************************************************/
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let indiceEdicion = null; // Índice del producto que se está editando

/*************************************************************
 * ✅ Función para guardar los productos en localStorage
 *************************************************************/
function guardarEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

/*************************************************************
 * ✅ Función para agregar o actualizar un producto
 *************************************************************/
function guardarProducto(nombre, precio, cantidad) {
  let producto = { nombre, precio, cantidad };

  if (indiceEdicion === null) {
    productos.push(producto); // Agregar nuevo producto
  } else {
    productos[indiceEdicion] = producto; // Editar producto existente
    indiceEdicion = null; // Resetear modo edición
  }

  guardarEnLocalStorage(); // Guardamos en localStorage
  mostrarProductos(); // Actualizamos la tabla
  document.getElementById("formulario-producto").reset(); // Limpiamos formulario
}

/*************************************************************
 * ✅ Función para eliminar un producto del inventario
 *************************************************************/
function eliminarProducto(index) {
  productos.splice(index, 1); // Eliminamos del array
  guardarEnLocalStorage(); // Guardamos cambios en localStorage
  mostrarProductos(); // Actualizamos la tabla
}

/*************************************************************
 * ✅ Función para cargar datos de un producto en el formulario
 *************************************************************/
function editarProducto(index) {
  let producto = productos[index];
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio.toFixed(2);
  document.getElementById("cantidad").value = producto.cantidad;
  indiceEdicion = index; // Guardamos el índice para edición
}

/*************************************************************
 * ✅ Función para mostrar los productos en la tabla HTML
 *************************************************************/
function mostrarProductos() {
  let tabla = document.getElementById("tabla-productos");
  tabla.innerHTML = ""; // Limpiamos la tabla

  productos.forEach((producto, index) => {
    let fila = `
            <tr>
                <td class="p-2">${producto.nombre}</td>
                <td class="p-2">${producto.precio.toFixed(2)} €</td>
                <td class="p-2">${producto.cantidad}</td>
                <td class="p-2 flex gap-2 justify-center">
                    <button onclick="editarProducto(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                    <button onclick="eliminarProducto(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
            </tr>
        `;
    tabla.innerHTML += fila;
  });
}

/*************************************************************
 * ✅ Función para filtrar productos en tiempo real
 *************************************************************/
function filtrarProductos() {
  let textoBusqueda = document
    .getElementById("buscar")
    .value.toLowerCase()
    .trim();
  let productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(textoBusqueda)
  );
  mostrarProductosFiltrados(productosFiltrados);
}

/*************************************************************
 * ✅ Función para mostrar productos filtrados en la tabla
 *************************************************************/
function mostrarProductosFiltrados(productosFiltrados) {
  let tabla = document.getElementById("tabla-productos");
  tabla.innerHTML = ""; // Limpiamos la tabla

  productosFiltrados.forEach((producto, index) => {
    let fila = `
            <tr>
                <td class="p-2">${producto.nombre}</td>
                <td class="p-2">${producto.precio.toFixed(2)} €</td>
                <td class="p-2">${producto.cantidad}</td>
                <td class="p-2 flex gap-2 justify-center">
                    <button onclick="editarProducto(${index})" class="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                    <button onclick="eliminarProducto(${index})" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                </td>
            </tr>
        `;
    tabla.innerHTML += fila;
  });
}

/*************************************************************
 * ✅ Capturar el evento "input" en el campo de búsqueda
 *************************************************************/
document.getElementById("buscar").addEventListener("input", filtrarProductos);

/*************************************************************
 * ✅ Capturar el evento "submit" del formulario para agregar/editar productos
 *************************************************************/
document
  .getElementById("formulario-producto")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let precioTexto = document.getElementById("precio").value.replace(",", ".");
    let precio = parseFloat(precioTexto);
    let cantidad = parseInt(document.getElementById("cantidad").value);

    if (
      nombre === "" ||
      isNaN(precio) ||
      isNaN(cantidad) ||
      precio <= 0 ||
      cantidad <= 0
    ) {
      alert(
        "Por favor, ingrese valores válidos. Recuerda que el precio puede tener decimales."
      );
      return;
    }

    guardarProducto(nombre, precio, cantidad);
  });

/*************************************************************
 * ✅ Cargar los productos almacenados en localStorage al iniciar la página
 *************************************************************/
document.addEventListener("DOMContentLoaded", mostrarProductos);
