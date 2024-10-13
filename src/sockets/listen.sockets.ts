import ISocket from '../interfaces/utils/socket.model';

function listenSockets(io) {
  io.of('/sockets').on('connection', async (socket: ISocket) => {
    const { ns } = socket.handshake.query;

    let disconnect_counter;
    disconnect_counter = await authenticateUser({ socket, ns });

    socket.on('reauth', async () => {
      clearTimeout(disconnect_counter);
      disconnect_counter = await authenticateUser({ socket, ns });
    });
  });
}

async function authenticateUser({ socket, ns }) {
  try {
    //TODO: Implement authentication logic here
    await initializeSockets(socket, ns);
  } catch (e) {
    socket.emit('auth_error');
    console.log(`Unauthorized (${e})`);
    return setTimeout(() => socket.disconnect(), 10000);
  }

  return null;
}

async function initializeSockets(socket: ISocket, ns: string | string[]) {
  try {
    if (ns == '/test') {
      console.log('Connected to /test namespace');
      socket.on('test', async data => {
        console.log(data);
      });
    } else {
      socket.disconnect();
    }
  } catch (error) {
    console.log(error);
    socket.disconnect();
  }
}

export default listenSockets;
