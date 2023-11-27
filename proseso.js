// script.js

function mostrarImagen() {
  var nombre = document.getElementById('imagenNombre').value;
  var carpeta = 'imagenes/todas/';
  var url = carpeta + nombre;
  var resultado = document.getElementById('resultado');

  // Muestra un alert para saber qué tecla se está presionando
  alert('Tecla presionada: ' + event.key);

  // Verificar si el campo de nombre está lleno y la URL es válida
  if (nombre && url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
    resultado.innerHTML = '<img id="output" src="' + url + '" alt="' + nombre + '">';
  } else {
    resultado.innerHTML = '<p>Por favor, ingresa un nombre válido.</p>';
  }
}
