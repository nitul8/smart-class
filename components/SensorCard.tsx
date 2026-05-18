import { View, Text } from 'react-native';
import { SensorData } from '../services/sensorDataService';

import { ThermometerSun, Droplet, Users, SunDim, Wifi } from 'lucide-react-native';

type SensorCardProps = {
  data: SensorData;
  isConnected: boolean;
};

export default function SensorCard({ data, isConnected }: SensorCardProps) {
  const stats = [
    {
      title: 'Temperature',
      value: `${data.temperature}°C`,
      icon: ThermometerSun,
      color: '#fb923c',
      glow: 'rgba(251,146,60,0.12)',
    },
    {
      title: 'Humidity',
      value: `${data.humidity}%`,
      icon: Droplet,
      color: '#38bdf8',
      glow: 'rgba(56,189,248,0.12)',
    },
    {
      title: 'Students',
      value: `${data.student}`,
      icon: Users,
      color: '#a78bfa',
      glow: 'rgba(167,139,250,0.12)',
    },
    {
      title: 'Light',
      value: `${data.light}`,
      icon: SunDim,
      color: '#facc15',
      glow: 'rgba(250,204,21,0.12)',
    },
  ];

  return (
    <View style={{ marginTop: 26 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
        }}>
        <View>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>Live Analytics</Text>
          <Text style={{ color: 'rgba(255,255,255,0.5)', marginTop: 4, fontSize: 14 }}>
            Real-time classroom environment
          </Text>
        </View>

        {/* Connection Badge */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: isConnected ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
            borderWidth: 1,
            borderColor: isConnected ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
          }}>
          <Wifi size={15} color={isConnected ? '#22c55e' : '#ef4444'} />

          <Text
            style={{
              marginLeft: 7,
              color: isConnected ? '#22c55e' : '#ef4444',
              fontWeight: '700',
              fontSize: 12,
            }}>
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </Text>
        </View>
      </View>

      {/* Grid */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <View
              key={index}
              style={{
                width: '48%',
                marginBottom: 16,
                padding: 16,
                borderRadius: 26,
                backgroundColor: item.color + '1a',
                borderWidth: 1,
                borderColor: item.color + '2f',
              }}>
              {/* Content */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {/* Icon */}
                <View
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 27,
                    backgroundColor: item.glow,
                    borderWidth: 1,
                    borderColor: item.glow + '1a',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon size={26} color={item.color} />
                </View>
                {/* Value */}
                <Text style={{ color: item.color, fontSize: 20, fontWeight: '500' }}>
                  {item.value}
                </Text>
              </View>
              {/* Title */}
              <Text
                style={{
                  marginTop: 12,
                  color: item.color + 'cc',
                }}>
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
