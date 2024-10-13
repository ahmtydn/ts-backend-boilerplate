import { Socket } from 'socket.io';

interface ISocket extends Socket {
  user: any;
}

export default ISocket;
