import { View, Pressable, Image } from 'react-native';
import { Menu, Trash2, ArrowLeft } from 'lucide-react-native';

type Props = {
  onDeleteRoom?: () => void;
  isAutoMode: boolean;
  onToggleAutoMode: (nextValue: boolean) => void;
};

export default function Navbar({ onDeleteRoom, isAutoMode, onToggleAutoMode }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <Pressable
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ArrowLeft color="white" />
      </Pressable>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable
          onPress={onDeleteRoom}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Trash2 color="white" />
        </Pressable>

        <Pressable
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Menu color="white" />
        </Pressable>

        <Pressable onPress={() => onToggleAutoMode(!isAutoMode)}>
          <Image
            source={{
              uri: isAutoMode
                ? 'https://uxwing.com/wp-content/themes/uxwing/download/internet-network-technology/robot-bot-icon.png'
                : 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png',
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: '#fb923c',
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}
