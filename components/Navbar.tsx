import { View, Pressable, Image } from 'react-native';
import { ChevronLeft, Menu, Trash2 } from 'lucide-react-native';

type Props = {
  onDeleteRoom?: () => void;
};

export default function Navbar({ onDeleteRoom }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',

        justifyContent: 'space-between',

        alignItems: 'center',

        marginBottom: 20,
      }}>
      {/* back button */}

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
        <ChevronLeft color="white" />
      </Pressable>

      {/* right side */}

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* delete room */}

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
          <Trash2 color="white" size={18} />
        </Pressable>

        {/* menu */}

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

        {/* avatar */}

        <Image
          source={{
            uri: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png',
          }}
          style={{
            width: 44,
            height: 44,

            borderRadius: 22,

            borderWidth: 2,

            borderColor: '#fb923c',
          }}
        />
      </View>
    </View>
  );
}
