import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { getGlobalSocket } from '../services/sensorDataService';

type FanCardProps = {
  title: string;
};

export default function FanCard({ title }: FanCardProps) {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const socket = getGlobalSocket();
    if (!socket) return;

    socket.on('classroom_update', (payload) => {
      console.log('💧 Humidity:', payload.humidity);

      // humidity > 82 → FAN ON
      if (payload.humidity > 82) {
        setIsOn(true);
      } else {
        // humidity <= 82 → FAN OFF
        setIsOn(false);
      }
    });

    return () => {
      socket.off('classroom_update');
    };
  }, []);

  return (
    <View
      style={{
        width: '48%',
        padding: 16,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
        marginBottom: 14,
        shadowOpacity: 0.25,
        shadowRadius: 20,
      }}>
      {/* top row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* icon */}
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: 'white' }}>🌀</Text>
        </View>

        {/* toggle */}
        <Pressable
          style={{
            width: 42,
            height: 24,
            borderRadius: 20,
            justifyContent: 'center',
            backgroundColor: isOn ? '#fb923c' : 'rgba(255,255,255,0.15)',
          }}>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: 'white',
              marginLeft: isOn ? 20 : 3,
            }}
          />
        </Pressable>
      </View>

      {/* title */}
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginTop: 18,
        }}>
        {title}
      </Text>

      {/* status */}
      <View
        style={{
          marginTop: 8,
          alignSelf: 'flex-start',
          backgroundColor: 'rgba(0,0,0,0.35)',
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: isOn ? '#22c55e' : '#ef4444',
            }}
          />

          <Text
            style={{
              color: 'white',
              fontSize: 12,
            }}>
            {isOn ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>
    </View>
  );
}
