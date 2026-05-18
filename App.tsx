import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { ScrollView, View, Text, TextInput, Modal, Pressable, StatusBar } from 'react-native';

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
  const [isAutoMode, setIsAutoMode] = useState(false);

  const { client, data, isConnected, fanOn, lightOn, setFanManualState, setLightManualState } =
    useSensorData(isAutoMode);

  const isRoomOccupied = data.student > 0;

  const isFanOn = isAutoMode ? isRoomOccupied && fanOn : fanOn;

  const isLightOn = isAutoMode ? isRoomOccupied && data.light === 'Bright' : lightOn;

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
      <StatusBar barStyle="light-content" />

      <LinearGradient colors={['#1B1B1B', '#121212', '#0A0A0A']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Background Glow */}
          <View
            style={{
              position: 'absolute',
              top: -120,
              right: -80,

              width: 260,
              height: 260,

              borderRadius: 130,

              backgroundColor: 'rgba(0,224,255,0.08)',
            }}
          />

          <View
            style={{
              position: 'absolute',
              bottom: -100,
              left: -60,

              width: 220,
              height: 220,

              borderRadius: 110,

              backgroundColor: 'rgba(253,186,33,0.06)',
            }}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 12,
              paddingBottom: 40,
            }}>
            {/* Navbar */}
            <Navbar
              onDeleteRoom={deleteRoom}
              isAutoMode={isAutoMode}
              onToggleAutoMode={setIsAutoMode}
            />

            {/* Header */}
            <View style={{ marginTop: 12 }}>
              <Text style={{ color: 'gray', fontSize: 15, fontWeight: '500', marginBottom: 8 }}>
                SMART CLASSROOM
              </Text>
              <Text style={{ fontSize: 22, fontWeight: '800', lineHeight: 30 }}>
                <Text style={{ color: 'white' }}>Welcome to </Text>
                <Text style={{ color: '#00E0FF' }}>
                  Department of Computer Science & Engineering
                </Text>
              </Text>
            </View>

            {/* Room Tabs */}
            <RoomTabs rooms={rooms} onAddRoom={() => setShowModal(true)} setHorizontalScroll />

            {/* Sensor Analytics */}
            {client && <SensorCard data={data} isConnected={isConnected} />}

            {/* Section Header */}
            <View
              style={{
                marginTop: 30,
                marginBottom: 18,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>
                  Smart Controls
                </Text>

                <Text style={{ marginTop: 4, color: '#ffffff80', fontSize: 14 }}>
                  Manage connected classroom devices
                </Text>
              </View>
            </View>

            {/* Device Cards */}
            <View
              style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <FanCard
                title="Fan"
                isOn={isFanOn}
                isAutoMode={isAutoMode}
                onToggle={setFanManualState}
              />
              <LightCard
                title="Light"
                isOn={isLightOn}
                isAutoMode={isAutoMode}
                onToggle={setLightManualState}
              />
            </View>
          </ScrollView>

          {/* Add Room Modal */}
          <Modal visible={showModal} transparent animationType="fade">
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.65)',
                padding: 24,
              }}>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#161616',
                  borderRadius: 32,
                  padding: 24,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.08)',
                }}>
                {/* Header */}
                <Text
                  style={{
                    color: 'white',
                    fontSize: 26,
                    fontWeight: '700',
                  }}>
                  Add New Room
                </Text>

                <Text style={{ marginTop: 6, color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                  Create and manage another classroom
                </Text>

                {/* Input */}
                <TextInput
                  value={newRoom}
                  onChangeText={setNewRoom}
                  placeholder="eg. NB 201"
                  placeholderTextColor="rgba(255,255,255,0.35)"
                  style={{
                    marginTop: 24,
                    height: 58,
                    borderRadius: 18,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.08)',
                    paddingHorizontal: 18,
                    color: 'white',
                    fontSize: 16,
                  }}
                />

                {/* Buttons */}
                <View style={{ flexDirection: 'row', marginTop: 28, gap: 14 }}>
                  <Pressable
                    onPress={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      height: 54,
                      borderRadius: 18,
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: '600' }}>
                      Cancel
                    </Text>
                  </Pressable>

                  {/* Add */}
                  <Pressable
                    onPress={addRoom}
                    style={{
                      flex: 1,
                      height: 54,
                      borderRadius: 18,
                      backgroundColor: '#00E0FF',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#111', fontSize: 15, fontWeight: '800' }}>Add Room</Text>
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
