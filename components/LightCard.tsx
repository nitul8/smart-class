import { View, Text, Pressable } from 'react-native';
import { Lightbulb } from 'lucide-react-native';

type LightCardProps = {
  title: string;
  isOn: boolean;
  isAutoMode: boolean;
  brightness?: number;
  onToggle: (state: boolean) => void;
};

export default function LightCard({
  title,
  isOn,
  isAutoMode,
  brightness = 60,
  onToggle,
}: LightCardProps) {
  return (
    <View
      style={{
        width: '48%',
        borderRadius: 28,
        padding: 18,
        backgroundColor: '#FDBA212D',
        borderWidth: 1,
        borderColor: '#ffffff33',
        overflow: 'hidden',
      }}>
      {/* Glow */}
      <View
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: 100,
          backgroundColor: isOn ? '#FDBA212D' : '#ffffff08',
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
            backgroundColor: isOn ? '#FDBA212D' : '#ffffff08',
            borderWidth: 1,
            borderColor: isOn ? '#FDBA2166' : '#ffffff33',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Lightbulb size={28} color={isOn ? '#FDBA21' : '#ffffffcc'} />
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
            backgroundColor: isOn ? '#FDBA21' : '#ffffff08',
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
            backgroundColor: isOn ? '#FDBA212D' : '#ffffff08',
          }}>
          <Text style={{ color: isOn ? '#facc15' : '#9ca3af', fontWeight: '700', fontSize: 12 }}>
            {isOn ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>
    </View>
  );
}
