import { View, Text, Pressable, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Plus, Circle } from 'lucide-react-native';

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
      {/* Add Room Button */}
      <Pressable
        onPress={onAddRoom}
        style={{
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: 'rgb(28, 28, 28)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 14,
          elevation: 6,
        }}>
        <Plus size={24} color="white" />
      </Pressable>

      {/* Room Tabs */}
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
              minWidth: 130,
              height: 58,
              paddingHorizontal: 18,
              borderRadius: 24,
              backgroundColor: selected ? 'rgba(0,224,255,0.14)' : 'rgba(255,255,255,0.06)',
              borderWidth: 1,
              borderColor: selected ? 'rgba(0,224,255,0.35)' : 'rgba(255,255,255,0.08)',
              marginRight: 14,
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            {/* Glow */}
            {selected && (
              <View
                style={{
                  position: 'absolute',
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  backgroundColor: 'rgba(0,224,255,0.12)',
                  top: -40,
                  right: -40,
                }}
              />
            )}

            {/* Content */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/* Room Name */}
              <View>
                <Text
                  style={{
                    color: selected ? '#00E0FF' : 'white',
                    fontWeight: '700',
                    fontSize: 18,
                    letterSpacing: 0.3,
                  }}>
                  {room}
                </Text>
              </View>

              {/* Status Dot */}
              <Circle
                size={10}
                fill={selected ? '#22c55e' : '#ef4444'}
                color={selected ? '#22c55e' : '#ef4444'}
              />
            </View>
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
        style={{ marginVertical: 24 }}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 10,
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
        marginVertical: 24,
      }}>
      <TabList />
    </View>
  );
}
