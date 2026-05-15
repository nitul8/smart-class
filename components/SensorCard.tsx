import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSensorData } from '../services/sensorDataService';
import { ThermometerSun, Droplet, Users, SunDim } from 'lucide-react-native';

export default function SensorCard() {
  const { data, isConnected } = useSensorData();

  return (
    <View style={{ borderRadius: 20, overflow: 'hidden', marginTop: 20 }}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)']}
        style={{ padding: 18 }}>
        {/* Connection Status */}
        <Text
          style={{ color: isConnected ? '#22c55e' : '#ef4444', marginBottom: 10, fontSize: 12 }}>
          {isConnected ? '● Live Data' : '● Disconnected'}
        </Text>

        {/* Temperature */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <ThermometerSun color="white" />
          <Text style={{ color: 'white', marginLeft: 10, flex: 1 }}>Temperature</Text>
          <Text style={{ color: 'white' }}>{data.temperature} °C</Text>
        </View>

        {/* Humidity */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Droplet color="white" />
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 10, flex: 1 }}>Humidity</Text>
          <Text style={{ color: '#38bdf8', fontSize: 18, fontWeight: '700' }}>
            {data.humidity}%
          </Text>
        </View>

        {/* Students */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Users color="white" />
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 10, flex: 1 }}>
            Student Count
          </Text>
          <Text style={{ color: '#a78bfa', fontSize: 18, fontWeight: '700' }}>{data.student}</Text>
        </View>

        {/* Light */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <SunDim color="white" />
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 10, flex: 1 }}>Light Level</Text>
          <Text style={{ color: '#fbbf24', fontSize: 18, fontWeight: '700' }}>{data.light}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
