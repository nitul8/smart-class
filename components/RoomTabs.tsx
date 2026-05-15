import { View, Text, Pressable, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react-native';

type Props = {
  rooms: string[];
  onChange?: (room: string) => void;
  onAddRoom?: () => void;
  setHorizontalScroll?: boolean;
};

export default function RoomTabs({ rooms, onChange, onAddRoom, setHorizontalScroll }: Props) {
  const [active, setActive] = useState<string>(rooms[0] ?? '');

  useEffect(() => {
    if (rooms.length === 0) {
      if (active !== '') setActive('');
      return;
    }

    if (!active || !rooms.includes(active)) {
      setActive(rooms[0]);
    }
  }, [rooms, active]);

  const TabList = () => (
    <>
      {/* + button */}

      <Pressable
        onPress={onAddRoom}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,

          backgroundColor: 'rgba(255,255,255,0.12)',

          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',

          alignItems: 'center',
          justifyContent: 'center',

          marginRight: 10,
        }}>
        <Plus color="white" />
      </Pressable>

      {/* tabs */}

      {rooms.map((room) => {
        const selected = active === room;

        return (
          <Pressable
            key={room}
            onPress={() => {
              setActive(room);
              onChange?.(room);
            }}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 10,

              borderRadius: 20,

              backgroundColor: selected ? 'white' : 'rgba(255,255,255,0.12)',

              borderWidth: 1,

              borderColor: 'rgba(255,255,255,0.2)',

              marginRight: 10,
            }}>
            <Text
              style={{
                color: selected ? '#7c4a12' : 'white',

                fontWeight: '500',
                fontSize: 16,
              }}>
              {room}
            </Text>
          </Pressable>
        );
      })}
    </>
  );

  if (setHorizontalScroll) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 20 }}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TabList />
      </ScrollView>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: 20,
      }}>
      <TabList />
    </View>
  );
}
