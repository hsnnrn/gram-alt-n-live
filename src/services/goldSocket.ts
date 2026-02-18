// anlikaltinfiyatlari.com ile aynı: WebSocket (Socket.IO) ile sürekli anlık fiyat
import { io, type Socket } from 'socket.io-client';
import type { QueryClient } from '@tanstack/react-query';
import { parseKapalicarsiPayload } from './goldApi';

const SOCKET_PATH = '/sio/p7013/socket.io';
const SOCKET_URLS = [
  'https://socket.anlikaltinfiyatlari.com',
  'https://anlikaltinfiyatlari.com',
  'https://socket2.anlikaltinfiyatlari.com',
];

function tryConnect(url: string, timeoutMs: number): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const s = io(url, {
      path: SOCKET_PATH,
      transports: ['websocket'],
      reconnection: true,
      timeout: timeoutMs,
    });
    const onConnect = () => {
      s.off('connect', onConnect);
      s.off('connect_error', onError);
      resolve(s);
    };
    const onError = () => {
      s.off('connect', onConnect);
      s.off('connect_error', onError);
      s.close();
      reject(new Error('connect_error'));
    };
    s.once('connect', onConnect);
    s.once('connect_error', onError);
  });
}

export function connectGoldSocket(queryClient: QueryClient): () => void {
  let socket: Socket | null = null;

  (async () => {
    for (let i = 0; i < SOCKET_URLS.length; i++) {
      const url = SOCKET_URLS[i];
      const timeout = i < 2 ? 3000 : 5000;
      try {
        socket = await tryConnect(url, timeout);

        socket.on('kapalicarsi', (response: string) => {
          try {
            const raw = typeof response === 'string' ? JSON.parse(response) : response;
            const items = parseKapalicarsiPayload(raw);
            if (items.length > 0) {
              queryClient.setQueryData(['kapalicarsi-prices'], items);
            }
          } catch {
            // ignore parse errors
          }
        });

        socket.on('disconnect', () => {
          socket = null;
        });
        return;
      } catch {
        // try next URL
      }
    }
  })();

  return () => {
    if (socket) {
      socket.removeAllListeners();
      socket.close();
      socket = null;
    }
  };
}
