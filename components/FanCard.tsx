import { View, Text, Pressable } from 'react-native';
import { Fan } from 'lucide-react-native';

type FanCardProps = {
  title: string;
  isOn: boolean;
  isAutoMode: boolean;
  onToggle: (state: boolean) => void;
};

export default function FanCard({ title, isOn, isAutoMode, onToggle }: FanCardProps) {
  return (
    <View
      style={{
        width: '48%',
        borderRadius: 28,
        padding: 18,
        backgroundColor: '#00E0FF1D',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
      {/* Glow */}
      <View
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: 100,
          backgroundColor: isOn ? '#00e0ff1f' : '#ffffff08',
          top: -60,
          right: -60,
        }}
      />

      {/* Top Row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        {/* Icon */}
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            backgroundColor: isOn ? '#00e0ff1f' : '#ffffff08',
            borderWidth: 1,
            borderColor: isOn ? '#00e0ff66' : '#ffffff1f',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fan size={28} color={isOn ? '#00E0FF' : '#ffffffcc'} />
        </View>

        {/* Toggle */}
        <Pressable
          disabled={isAutoMode}
          onPress={() => onToggle(!isOn)}
          style={{
            width: 54,
            height: 30,
            borderRadius: 20,
            paddingHorizontal: 4,
            justifyContent: 'center',
            backgroundColor: isOn ? '#00E0FF' : '#ffffff08',
            opacity: isAutoMode ? 0.5 : 1,
          }}>
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: 'white',
              alignSelf: isOn ? 'flex-end' : 'flex-start',
            }}
          />
        </Pressable>
      </View>

      {/* Content */}
      <View style={{ marginTop: 18 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: '700',
          }}>
          {title}
        </Text>

        {/* Status Badge */}
        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: 12,
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: isOn ? '#00e0ff1f' : '#ffffff08',
          }}>
          <Text style={{ color: isOn ? '#22c55e' : '#9ca3af', fontWeight: '700', fontSize: 12 }}>
            {isOn ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>
    </View>
  );
}
