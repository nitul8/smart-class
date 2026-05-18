import { View, Pressable, Text } from 'react-native';
import { Trash2, ArrowLeft, User2, Bot, Wifi } from 'lucide-react-native';

type Props = {
  onDeleteRoom?: () => void;
  isAutoMode: boolean;
  onToggleAutoMode: (nextValue: boolean) => void;
};

export default function Navbar({ onDeleteRoom, isAutoMode, onToggleAutoMode }: Props) {
  return (
    <View
      style={{
        marginBottom: 26,
      }}>
      {/* Top Row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* Back Button */}
        <Pressable
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,

            backgroundColor: 'rgba(255,255,255,0.06)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.08)',

            alignItems: 'center',
            justifyContent: 'center',

            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 6 },

            elevation: 6,
          }}>
          <ArrowLeft size={22} color="white" />
        </Pressable>

        {/* Right Buttons */}
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
          }}>
          {/* Delete */}
          <Pressable
            onPress={onDeleteRoom}
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,

              backgroundColor: 'rgba(255,255,255,0.06)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.08)',

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Trash2 size={20} color="#ff6b6b" />
          </Pressable>

          {/* Auto/Manual */}
          <Pressable
            onPress={() => onToggleAutoMode(!isAutoMode)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,

              height: 52,
              borderRadius: 26,

              backgroundColor: isAutoMode ? 'rgba(0,224,255,0.12)' : 'rgba(255,255,255,0.06)',

              borderWidth: 1,

              borderColor: isAutoMode ? 'rgba(0,224,255,0.35)' : 'rgba(255,255,255,0.08)',

              gap: 8,
            }}>
            {isAutoMode ? <Bot size={18} color="#00E0FF" /> : <User2 size={18} color="#ffffff" />}
          </Pressable>
        </View>
      </View>

      {/* Status Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 18,
          gap: 10,
        }}>
        {/* Online Dot */}
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: '#22c55e',

            shadowColor: '#22c55e',
            shadowOpacity: 0.9,
            shadowRadius: 8,
          }}
        />

        <Text
          style={{
            color: '#22c55e',
            fontWeight: '600',
            fontSize: 13,
          }}>
          System Online
        </Text>

        {/* Divider */}
        <View
          style={{
            width: 1,
            height: 14,
            backgroundColor: 'rgba(255,255,255,0.15)',
          }}
        />

        {/* Wifi */}
        <Wifi size={15} color="rgba(255,255,255,0.7)" />

        <Text
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 13,
            fontWeight: '500',
          }}>
          Connected
        </Text>

        {/* Divider */}
        <View
          style={{
            width: 1,
            height: 14,
            backgroundColor: 'rgba(255,255,255,0.15)',
          }}
        />

        {/* Mode Badge */}
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 999,

            backgroundColor: isAutoMode ? 'rgba(0,224,255,0.12)' : 'rgba(255,255,255,0.08)',
          }}>
          <Text
            style={{
              color: isAutoMode ? '#00E0FF' : '#ffffff',
              fontSize: 12,
              fontWeight: '700',
            }}>
            {isAutoMode ? 'AUTO MODE' : 'MANUAL MODE'}
          </Text>
        </View>
      </View>
    </View>
  );
}
