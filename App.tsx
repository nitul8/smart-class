import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View, Text, TextInput, Modal, Pressable } from 'react-native';
import { useState } from 'react';

import './global.css';

import DeviceCard from './components/DeviceCard';
import SliderBar from './components/SliderBar';
import RoomTabs from 'components/RoomTabs';
import Navbar from 'components/Navbar';

export default function App() {
  const [rooms, setRooms] = useState(['NB 001', 'NB 104', 'NB 105']);
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState('');

  const addRoom = () => {
    if (newRoom.trim() !== '') {
      setRooms([...rooms, newRoom]);

      setNewRoom('');

      setShowModal(false);
    }
  };
  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#bc6926', '#684311', '#1f1508']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <Navbar
            onDeleteRoom={() => {
              setRooms(rooms.slice(0, -1));
            }}
          />
          <Text className="mb-1 mt-4 text-4xl font-bold text-white">Welcome to</Text>
          <Text className="mb-4 text-white">Department of Computer Science & Engineering</Text>

          {/* devices */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <RoomTabs rooms={rooms} onAddRoom={() => setShowModal(true)} setHorizontalScroll />
            </View>
            <SliderBar />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <DeviceCard title="Fan 1" />
              <DeviceCard title="Fan 2" />

              <DeviceCard title="Light 1" />
              <DeviceCard title="Light 2" />
            </View>
          </ScrollView>
          <Modal visible={showModal} transparent animationType="fade">
            <View
              style={{
                flex: 1,

                justifyContent: 'center',

                alignItems: 'center',

                backgroundColor: 'rgba(0,0,0,0.4)',
              }}>
              <View
                style={{
                  width: '80%',

                  backgroundColor: '#2b1a0a',

                  padding: 20,

                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    color: 'white',

                    fontSize: 18,

                    marginBottom: 10,
                  }}>
                  Enter Room Name
                </Text>

                <TextInput
                  value={newRoom}
                  onChangeText={setNewRoom}
                  placeholder="eg. NB 201"
                  placeholderTextColor="#ffffff66"
                  style={{
                    borderWidth: 1,

                    borderColor: 'rgba(255,255,255,0.2)',

                    borderRadius: 10,

                    padding: 10,

                    color: 'white',

                    marginBottom: 15,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',

                    justifyContent: 'space-between',
                  }}>
                  <Pressable onPress={() => setShowModal(false)}>
                    <Text style={{ color: '#ffffff99' }}>Cancel</Text>
                  </Pressable>

                  <Pressable onPress={addRoom}>
                    <Text style={{ color: '#fb923c' }}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
