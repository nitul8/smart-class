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
  fanOn: boolean;
  setLightManualState: (state: boolean) => void;
  setFanManualState: (state: boolean) => void;
};

let globalClient: MqttClient | null = null;
const MQTT_URL = 'wss://fbeb30b902b148499a95cd339b9fcd03.s1.eu.hivemq.cloud:8884/mqtt';

const USERNAME = 'nitulpi';
const PASSWORD = 'Articuno01#';

const DATA_TOPIC = 'smartclassroom/data';
const LIGHT_TOPIC = 'smartclassroom/light';
const FAN_TOPIC = 'smartclassroom/fan';
const MODE_TOPIC = 'smartclassroom/mode';

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

export const useSensorData = (isAutoMode: boolean): UseSensorDataReturn => {
  const [client, setClient] = useState<MqttClient | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const [lightOn, setLightOn] = useState(false);
  const [fanOn, setFanOn] = useState(false);

  const [data, setData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    student: 0,
    light: 'Bright',
    fan_status: 'OFF',
  });

  const setLightManualState = (state: boolean) => {
    if (isAutoMode) return;

    globalClient?.publish(MODE_TOPIC, 'manual');
    setLightOn(state);

    if (globalClient) {
      globalClient.publish(LIGHT_TOPIC, state ? 'on' : 'off');
    }
  };

  const setFanManualState = (state: boolean) => {
    if (isAutoMode) return;

    setFanOn(state);

    if (globalClient) {
      globalClient.publish(MODE_TOPIC, 'manual');
      globalClient.publish(FAN_TOPIC, state ? 'on' : 'off');
    }
  };

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
        } catch (error) {
          console.log('❌ JSON Parse Error:', error);
        }
      }
    });

    return () => {
      mqttClient.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    globalClient?.publish(MODE_TOPIC, isAutoMode ? 'auto' : 'manual');
  }, [isAutoMode]);

  useEffect(() => {
    if (!isAutoMode) return;

    const shouldLightBeOn = data.light === 'Dark';
    const shouldFanBeOn = data.humidity > 82;

    if (shouldLightBeOn !== lightOn) {
      console.log(shouldLightBeOn ? '💡 Turning ON lights' : '💡 Turning OFF lights');
      setLightOn(shouldLightBeOn);
      globalClient?.publish(LIGHT_TOPIC, shouldLightBeOn ? 'on' : 'off');
    }

    if (shouldFanBeOn !== fanOn) {
      console.log(shouldFanBeOn ? '🌀 Turning ON fan' : '🌀 Turning OFF fan');
      setFanOn(shouldFanBeOn);
      globalClient?.publish(FAN_TOPIC, shouldFanBeOn ? 'on' : 'off');
    }
  }, [isAutoMode, data.light, data.humidity, lightOn, fanOn]);

  return {
    client,
    socket: client,
    data,
    isConnected,
    lightOn,
    fanOn,
    setLightManualState,
    setFanManualState,
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
