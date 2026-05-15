import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export type SensorData = {
  temperature: number;
  humidity: number;
  student: number;
  light?: string;
};

type UseSensorDataReturn = {
  socket: Socket | null;
  data: SensorData;
  isConnected: boolean;
  lightOn: boolean;
};

const SOCKET_URL = 'http://192.168.2.77:5000';
let globalSocket: Socket | null = null;

// Initialize global socket once
const initializeSocket = (): Socket => {
  if (globalSocket) {
    return globalSocket;
  }

  const newSocket = io(SOCKET_URL, {
    transports: ['websocket'],
  });

  globalSocket = newSocket;
  return newSocket;
};

export const useSensorData = (): UseSensorDataReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [data, setData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    student: 0,
    light: 'Bright',
  });

  useEffect(() => {
    const sock = initializeSocket();
    setSocket(sock);

    sock.on('connect', () => {
      console.log('✅ Connected:', sock.id);
      setIsConnected(true);

      const interval = setInterval(() => {
        sock.emit('get_classroom_data');
      }, 10000);

      sock.on('disconnect', () => {
        clearInterval(interval);
        setIsConnected(false);
      });
    });

    sock.on('classroom_update', (payload: SensorData) => {
      console.log('📡 Data received:', payload);

      const newData = {
        temperature: payload.temperature ?? 0,
        humidity: payload.humidity ?? 0,
        student: payload.student ?? 0,
        light: payload.light ?? 'Bright',
      };

      setData(newData);

      // 🌙 Dark → Turn ON lights
      if (payload.light === 'Dark') {
        console.log('💡 Dark detected → Turning ON lights');
        sock.emit('turn_on_lights');
        setLightOn(true);
      }

      // ☀️ Bright → Turn OFF lights
      if (payload.light === 'Bright') {
        console.log('💡 Bright detected → Turning OFF lights');
        sock.emit('turn_off_lights');
        setLightOn(false);
      }
    });

    sock.on('turn_on_lights', () => {
      console.log('💡 Lights ON');
      setLightOn(true);
    });

    sock.on('turn_off_lights', () => {
      console.log('💡 Lights OFF');
      setLightOn(false);
    });

    return () => {
      sock.off('classroom_update');
      sock.off('connect');
      sock.off('disconnect');
      sock.off('turn_on_lights');
      sock.off('turn_off_lights');
    };
  }, []);

  const toggleLight = useCallback(
    (state: boolean) => {
      if (!socket) return;
      if (state) {
        socket.emit('turn_on_lights');
        setLightOn(true);
      } else {
        socket.emit('turn_off_lights');
        setLightOn(false);
      }
    },
    [socket]
  );

  return {
    socket,
    data,
    isConnected,
    lightOn,
  };
};

export const getGlobalSocket = (): Socket | null => {
  return globalSocket;
};

export const toggleLights = (state: boolean) => {
  if (!globalSocket) return;
  if (state) {
    globalSocket.emit('turn_on_lights');
  } else {
    globalSocket.emit('turn_off_lights');
  }
};
