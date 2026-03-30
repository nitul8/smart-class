import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Power, Lightbulb } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function SliderBar() {
  const [value, setValue] = useState(46);

  return (
    <View
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        marginTop: 20,
      }}>
      <LinearGradient
        colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          padding: 18,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.15)',
          backgroundColor: 'transparent',
        }}>
        {/* title row */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
            }}>
            Light 1
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              width: 38,
              height: 38,
              borderRadius: 19,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
            }}>
            <Power size={18} color="white" />
          </View>
        </View>

        {/* slider */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 18,
          }}>
          <Lightbulb size={20} color="rgba(255,255,255,0.8)" />

          <View style={{ flex: 1 }}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              value={value}
              onValueChange={(v) => setValue(Math.round(v))}
              minimumTrackTintColor="#fb923c"
              maximumTrackTintColor="rgba(255,255,255,0.15)"
              thumbTintColor="#ffffff"
              style={{
                width: '100%',
                height: 40,
              }}
            />
          </View>

          <Text
            style={{
              color: 'white',
              fontWeight: '600',
              width: 45,
              textAlign: 'right',
            }}>
            {value}%
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
