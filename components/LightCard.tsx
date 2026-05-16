import { View, Text, Pressable } from 'react-native';

type LightCardProps = {
  title: string;
  isOn: boolean;
  isAutoMode: boolean;
  onToggle: (state: boolean) => void;
};

export default function LightCard({ title, isOn, isAutoMode, onToggle }: LightCardProps) {
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
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: 'white' }}>💡</Text>
        </View>

        {/* toggle */}
        <Pressable
          disabled={isAutoMode}
          onPress={() => onToggle(!isOn)}
          style={{
            width: 42,
            height: 24,
            borderRadius: 20,
            justifyContent: 'center',
            backgroundColor: isAutoMode
              ? 'rgba(255,255,255,0.1)'
              : isOn
                ? '#fb923c'
                : 'rgba(255,255,255,0.15)',
            opacity: isAutoMode ? 0.65 : 1,
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
        <Text
          style={{
            color: 'white',
            fontSize: 12,
          }}>
          {isAutoMode ? 'AUTO' : isOn ? 'ON' : 'OFF'}
        </Text>
      </View>
    </View>
  );
}
