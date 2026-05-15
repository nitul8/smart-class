import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View, Text, TextInput, Modal, Pressable } from 'react-native';
import { useState } from 'react';

import SensorCard from './components/SensorCard';
import RoomTabs from './components/RoomTabs';
import Navbar from './components/Navbar';
import FanCard from './components/FanCard';
import LightCard from './components/LightCard';
import { useSensorData } from './services/sensorDataService';

export default function App() {
  const [rooms, setRooms] = useState(['NB 001', 'NB 104', 'NB 105']);
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState('');

  // Fetch all data from centralized service
  const { socket } = useSensorData();

  const addRoom = () => {
    if (newRoom.trim() !== '') {
      setRooms((prev) => [...prev, newRoom.trim()]);
      setNewRoom('');
      setShowModal(false);
    }
  };

  const deleteRoom = () => {
    if (rooms.length === 0) return;

    setRooms((prev) => prev.slice(0, -1));
  };

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#bc6926', '#684311', '#1f1508']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          {/* Navbar */}
          <Navbar onDeleteRoom={deleteRoom} />

          {/* Header */}
          <Text
            style={{
              marginTop: 16,
              fontSize: 32,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Welcome to
          </Text>

          <Text
            style={{
              marginBottom: 16,
              color: 'white',
            }}>
            Department of Computer Science & Engineering
          </Text>

          {/* Content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Room Tabs */}
            <View style={{ flexDirection: 'row' }}>
              <RoomTabs rooms={rooms} onAddRoom={() => setShowModal(true)} setHorizontalScroll />
            </View>

            {/* Sensor Card */}
            {socket && <SensorCard />}

            {/* Devices */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <FanCard title="Fan 1" />
              <FanCard title="Fan 2" />
              <LightCard title="Light 1" />
              <LightCard title="Light 2" />
            </View>
          </ScrollView>

          {/* Modal */}
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
