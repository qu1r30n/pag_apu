// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

// Lista para almacenar los sockets de los clientes conectados.
const clientes = new Set();

server.on('connection', (socket) => {
  console.log('Cliente conectado.');

  // Agregar el nuevo socket a la lista de clientes.
  clientes.add(socket);

  // Enviar un mensaje al cliente cuando se establece la conexión.
  socket.send('¡Hola, cliente!');

  // Manejar mensajes del cliente.
  socket.on('message', (mensaje) => {
    console.log(`Mensaje del cliente: ${mensaje}`);

    // Enviar el mensaje a todos los clientes.
    broadcast(mensaje, socket);
  });

  // Manejar el evento de cierre de conexión.
  socket.on('close', () => {
    console.log('Cliente desconectado.');
    // Eliminar el socket desconectado de la lista de clientes.
    clientes.delete(socket);
  });
});

// Función para enviar mensajes a todos los clientes, excepto al remitente.
function broadcast(mensaje, remitente) {
  clientes.forEach((cliente) => {
    // No enviar el mensaje al remitente.
    if (cliente !== remitente) {
      cliente.send(mensaje);
    }
  });
}
