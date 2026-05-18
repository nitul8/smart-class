import { useEffect, useState, useRef } from 'react';
import mqtt, { MqttClient } from 'mqtt';

export type SensorData = {
  temperature: number;
  humidity: number;
  student: number;
  light: string;
  fan_status: 'ON' | 'OFF';
  mode: 'AUTO' | 'MANUAL';
};

type UseSensorDataReturn = {
  client: MqttClient | null;
  socket?: MqttClient | null;
  data: SensorData;
  isConnected: boolean;
  fanOn: boolean;
  lightOn: boolean;
  setFanManualState: (state: boolean) => void;
  setLightManualState: (state: boolean) => void;
};

let globalClient: MqttClient | null = null;
const MQTT_URL = 'wss://fbeb30b902b148499a95cd339b9fcd03.s1.eu.hivemq.cloud:8884/mqtt';

const USERNAME = 'nitulpi';
const PASSWORD = 'Articuno01#';

const DATA_TOPIC = 'smartclassroom/data';
const CONTROL_TOPIC_FAN = 'smartclassroom/fan';
const CONTROL_TOPIC_LIGHT = 'smartclassroom/light';

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

  const [fanOn, setFanOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);

  const [data, setData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
    student: 0,
    light: 'Bright',
    fan_status: 'OFF',
    mode: 'AUTO',
  });

  const setFanManualState = (state: boolean) => {
    if (isAutoMode) return;

    setFanOn(state);
    const now = Date.now();
    lastManualFanAtRef.current = now;

    if (globalClient) {
      publishIfChanged(CONTROL_TOPIC_FAN, 'manual', lastFanCmdRef);
      publishIfChanged(CONTROL_TOPIC_FAN, state ? 'on' : 'off', lastFanCmdRef);
    }
  };

  const setLightManualState = (state: boolean) => {
    if (isAutoMode) return;
    setLightOn(state);
    const now = Date.now();
    lastManualLightAtRef.current = now;

    if (globalClient) {
      publishIfChanged(CONTROL_TOPIC_LIGHT, 'manual', lastLightCmdRef);
      publishIfChanged(CONTROL_TOPIC_LIGHT, state ? 'light_on' : 'light_off', lastLightCmdRef);
    }
  };

  // refs to keep latest state and last published command
  const fanOnRef = useRef(fanOn);
  const lightOnRef = useRef(lightOn);
  const lastFanCmdRef = useRef<string | null>(null);
  const lastLightCmdRef = useRef<string | null>(null);
  const lastManualFanAtRef = useRef<number | null>(null);
  const lastManualLightAtRef = useRef<number | null>(null);
  const MANUAL_OVERRIDE_MS = 5000; // ignore incoming updates for 5s after manual change

  useEffect(() => {
    fanOnRef.current = fanOn;
  }, [fanOn]);

  useEffect(() => {
    lightOnRef.current = lightOn;
  }, [lightOn]);

  const publishIfChanged = (
    topic: string,
    cmd: string,
    lastRef: React.MutableRefObject<string | null>
  ) => {
    if (!globalClient) return;
    if (lastRef.current === cmd) return;
    globalClient.publish(topic, cmd);
    lastRef.current = cmd;
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

          const newData: SensorData = {
            temperature: payload.temperature ?? 0,
            humidity: payload.humidity ?? 0,
            student: payload.student ?? 0,
            light: payload.light ?? 'Bright',
            fan_status: payload.fan_status === 'ON' ? 'ON' : 'OFF',
            mode: payload.mode === 'MANUAL' ? 'MANUAL' : 'AUTO',
          };

          setData(newData);

          if (isAutoMode) {
            if (newData.student > 0) {
              // humidity hysteresis to prevent rapid toggling
              const HUMIDITY_ON = 82.0;
              const HUMIDITY_OFF = 80.0;

              const prevFanOn = !!fanOnRef.current;
              let shouldFanOn = false;
              if (prevFanOn) {
                shouldFanOn = newData.humidity >= HUMIDITY_OFF;
              } else {
                shouldFanOn = newData.humidity > HUMIDITY_ON;
              }

              setFanOn(shouldFanOn);

              const lightStr = (newData.light || '').toLowerCase();
              const shouldLightOn = lightStr === 'dark' || lightStr === 'darkness';
              setLightOn(shouldLightOn);

              // publish only when command changes
              publishIfChanged(CONTROL_TOPIC_FAN, shouldFanOn ? 'on' : 'off', lastFanCmdRef);
              publishIfChanged(
                CONTROL_TOPIC_LIGHT,
                shouldLightOn ? 'light_on' : 'light_off',
                lastLightCmdRef
              );
            } else {
              setFanOn(false);
              setLightOn(false);

              publishIfChanged(CONTROL_TOPIC_FAN, 'off', lastFanCmdRef);
              publishIfChanged(CONTROL_TOPIC_LIGHT, 'light_off', lastLightCmdRef);
            }
          } else {
            // Manual mode: reflect device states but avoid overwriting recent manual overrides
            const now = Date.now();

            const lastFanManual = lastManualFanAtRef.current ?? 0;
            if (now - lastFanManual > MANUAL_OVERRIDE_MS) {
              setFanOn(newData.fan_status === 'ON');
            } else {
              console.log('⏱ Skipping fan update due to recent manual override');
            }

            const lastLightManual = lastManualLightAtRef.current ?? 0;
            if (now - lastLightManual > MANUAL_OVERRIDE_MS) {
              setLightOn((newData.light || '').toLowerCase() === 'dark');
            } else {
              console.log('⏱ Skipping light update due to recent manual override');
            }
          }
        } catch (error) {
          console.log('❌ JSON Parse Error:', error);
        }
      }
    });

    return () => {
      mqttClient.removeAllListeners();
    };
  }, [isAutoMode]);

  useEffect(() => {
    // publish mode to both device topics
    publishIfChanged(CONTROL_TOPIC_FAN, isAutoMode ? 'auto' : 'manual', lastFanCmdRef);
    publishIfChanged(CONTROL_TOPIC_LIGHT, isAutoMode ? 'auto' : 'manual', lastLightCmdRef);
  }, [isAutoMode]);

  return {
    client,
    data,
    isConnected,
    fanOn,
    lightOn,
    setFanManualState,
    setLightManualState,
  };
};

export const getGlobalClient = (): MqttClient | null => {
  return globalClient;
};

export const toggleFan = (state: boolean) => {
  if (!globalClient) return;
  globalClient.publish(CONTROL_TOPIC_FAN, state ? 'on' : 'off');
};
