// cliente.js
const socket = new WebSocket('ws://localhost:3000');

// Manejar eventos del WebSocket.
socket.addEventListener('open', (event) => {
  console.log('Conectado al servidor.');
});

socket.addEventListener('message', (event) => {
  console.log(`Mensaje del servidor: ${event.data}`);
  mostrarMensaje(event.data);
});

socket.addEventListener('close', (event) => {
  console.log('Conexión cerrada.');
});

// Manejar el envío del formulario.
const formulario = document.getElementById('mensajeForm');
const inputMensaje = document.getElementById('mensajeInput');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  var mensaje = inputMensaje.value;

  mensaje = mensaje.toUpperCase();

  // Enviar el mensaje al servidor.
  socket.send(mensaje);

  // Limpiar el campo de entrada.
  inputMensaje.value = '';
});

// Mostrar mensajes debajo del formulario.
function mostrarMensaje(mensaje) {
  const mesaContainer = document.getElementById('mesaContainer');

  // Crear un elemento de párrafo para mostrar el mensaje.
  const mensajeParrafo = document.createElement('p');
  mensajeParrafo.textContent = mensaje;

  // Agregar el elemento de párrafo al contenedor.
  mesaContainer.appendChild(mensajeParrafo);
}
