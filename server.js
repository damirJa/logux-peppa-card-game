import { Server } from '@logux/server';

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    fileUrl: import.meta.url
  })
);

server.auth(async () => true);

server.type('card/flip', {
  access: () => true,
  process: (ctx, action, meta) => {
  },
});

server.type('card/move', {
  access: () => true,
  process: (ctx, action, meta) => {
  },
});

server.listen();
