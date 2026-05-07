// SensorCard.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSensorData } from '../services/sensorDataService';

export default function SensorCard() {
  const { data, isConnected } = useSensorData();

  return (
    <View style={{ borderRadius: 24, overflow: 'hidden', marginTop: 20 }}>
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
        style={{
          padding: 18,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.15)',
        }}>
        {/* Connection Status */}
        <Text
          style={{
            color: isConnected ? '#22c55e' : '#ef4444',
            marginBottom: 10,
            fontSize: 12,
          }}>
          {isConnected ? '● Live Data' : '● Disconnected'}
        </Text>

        {/* Temperature */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text className="text-2xl" style={{ color: '#fb923c' }}>
            °C
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 10,
              flex: 1,
            }}>
            Temperature
          </Text>

          <Text
            style={{
              color: '#fb923c',
              fontSize: 18,
              fontWeight: '700',
            }}>
            {data.temperature}
          </Text>
        </View>

        {/* Humidity */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text className="text-2xl" style={{ color: '#38bdf8' }}>
            %
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 10,
              flex: 1,
            }}>
            Humidity
          </Text>

          <Text
            style={{
              color: '#38bdf8',
              fontSize: 18,
              fontWeight: '700',
            }}>
            {data.humidity}%
          </Text>
        </View>

        {/* Students */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text className="text-2xl" style={{ color: '#a78bfa' }}>
            👥
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 10,
              flex: 1,
            }}>
            Student Count
          </Text>

          <Text
            style={{
              color: '#a78bfa',
              fontSize: 18,
              fontWeight: '700',
            }}>
            {data.student}
          </Text>
        </View>

        {/* Light */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text className="text-2xl" style={{ color: '#fbbf24' }}>
            💡
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              marginLeft: 10,
              flex: 1,
            }}>
            Light Level
          </Text>

          <Text
            style={{
              color: '#fbbf24',
              fontSize: 18,
              fontWeight: '700',
            }}>
            {data.light}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
