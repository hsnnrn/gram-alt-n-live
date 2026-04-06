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

function attachKapalicarsiHandler(s: Socket, queryClient: QueryClient) {
  s.on('kapalicarsi', (response: string) => {
    try {
      const raw = typeof response === 'string' ? JSON.parse(response) : response;
      const items = parseKapalicarsiPayload(raw);
      if (items.length > 0) {
        Promise.resolve().then(() => {
          queryClient.setQueryData(['kapalicarsi-prices'], items);
        });
      }
    } catch {
      // ignore parse errors
    }
  });
}

export function connectGoldSocket(queryClient: QueryClient): () => void {
  let socket: Socket | null = null;
  let cancelled = false;
  let connecting = false;

  const disconnect = () => {
    if (socket) {
      socket.removeAllListeners();
      socket.close();
      socket = null;
    }
  };

  const connect = async () => {
    if (cancelled || connecting) return;
    connecting = true;
    try {
      disconnect();
      for (let i = 0; i < SOCKET_URLS.length; i++) {
        if (cancelled) break;
        const url = SOCKET_URLS[i];
        const timeout = i < 2 ? 3000 : 5000;
        try {
          const s = await tryConnect(url, timeout);
          if (cancelled) {
            s.removeAllListeners();
            s.close();
            break;
          }
          socket = s;
          attachKapalicarsiHandler(s, queryClient);
          s.on('disconnect', () => {
            if (socket === s) socket = null;
          });
          break;
        } catch {
          // try next URL
        }
      }
    } finally {
      connecting = false;
    }
  };

  void connect();

  const onPageHide = (e: PageTransitionEvent) => {
    if (e.persisted) disconnect();
  };
  const onPageShow = (e: PageTransitionEvent) => {
    if (e.persisted && !cancelled) void connect();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);
  }

  return () => {
    cancelled = true;
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
    }
    disconnect();
  };
}
