import { useEffect, useState } from 'react';
import mqtt, { MqttClient } from 'mqtt';

export type SensorData = {
  temperature: number;
  humidity: number;
  student: number;
  light?: string;
  fan_status?: string;
};

type UseSensorDataReturn = {
  client: MqttClient | null;
  socket?: MqttClient | null;
  data: SensorData;
  isConnected: boolean;
  lightOn: boolean;
};

let globalClient: MqttClient | null = null;
const MQTT_URL = 'wss://fbeb30b902b148499a95cd339b9fcd03.s1.eu.hivemq.cloud:8884/mqtt';

const USERNAME = 'nitulpi';
const PASSWORD = 'Articuno01#';

const DATA_TOPIC = 'smartclassroom/data';
const LIGHT_TOPIC = 'smartclassroom/light';
const FAN_TOPIC = 'smartclassroom/fan';

const initializeMQTT = (): MqttClient => {
  if (globalClient) {
    return globalClient;
  }

  const client = mqtt.connect(MQTT_URL, {
    username: USERNAME,
    password: PASSWORD,
    reconnectPeriod: 1000,
    connectTimeout: 10000,
    clean: true,
  });

  globalClient = client;

  return client;
};

export const useSensorData = (): UseSensorDataReturn => {
  const [client, setClient] = useState<MqttClient | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const [lightOn, setLightOn] = useState(false);

  const [data, setData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    student: 0,
    light: 'Bright',
    fan_status: 'OFF',
  });

  useEffect(() => {
    const mqttClient = initializeMQTT();

    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('✅ Connected to HiveMQ');

      setIsConnected(true);

      mqttClient.subscribe(DATA_TOPIC, (err) => {
        if (err) {
          console.log('❌ Subscribe Error:', err);
        } else {
          console.log('📥 Subscribed:', DATA_TOPIC);
        }
      });
    });

    mqttClient.on('close', () => {
      console.log('❌ MQTT Disconnected');

      setIsConnected(false);
    });

    mqttClient.on('error', (err) => {
      console.log('⚠️ MQTT Error:', err);
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === DATA_TOPIC) {
        try {
          const payload: SensorData = JSON.parse(message.toString());

          console.log('📡 Data:', payload);

          const newData = {
            temperature: payload.temperature ?? 0,
            humidity: payload.humidity ?? 0,
            student: payload.student ?? 0,
            light: payload.light ?? 'Bright',
            fan_status: payload.fan_status ?? 'OFF',
          };

          setData(newData);

          if (payload.light === 'Dark') {
            console.log('💡 Turning ON lights');

            mqttClient.publish(LIGHT_TOPIC, 'on');

            setLightOn(true);
          }

          if (payload.light === 'Bright') {
            console.log('💡 Turning OFF lights');

            mqttClient.publish(LIGHT_TOPIC, 'off');

            setLightOn(false);
          }
        } catch (error) {
          console.log('❌ JSON Parse Error:', error);
        }
      }
    });

    return () => {
      mqttClient.removeAllListeners();
    };
  }, []);

  return {
    client,
    socket: client,
    data,
    isConnected,
    lightOn,
  };
};
// Note: `socket` is provided as an alias for backward compatibility

export const getGlobalClient = (): MqttClient | null => {
  return globalClient;
};

export const toggleLights = (state: boolean) => {
  if (!globalClient) return;

  globalClient.publish(LIGHT_TOPIC, state ? 'on' : 'off');
};

export const toggleFan = (state: boolean) => {
  if (!globalClient) return;

  globalClient.publish(FAN_TOPIC, state ? 'on' : 'off');
};
