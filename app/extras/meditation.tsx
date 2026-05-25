import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../../components/ui/Card';
import { NeonButton } from '../../components/ui/NeonButton';
import { ArrowLeft, Play, Pause, RotateCcw, Wind } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { Images } from '../../assets/images';

export default function MeditationScreen() {
  const router = useRouter();
  const [customMinutes, setCustomMinutes] = useState('10');
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isSettingTime, setIsSettingTime] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(parseInt(customMinutes) * 60 || 10 * 60);
  };

  const applyCustomTime = () => {
    const mins = parseInt(customMinutes);
    if (mins > 0 && mins < 180) {
      setTimeLeft(mins * 60);
      setIsSettingTime(false);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  return (
    <ImageBackground source={Images.profile} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft color="#9d4edd" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ZEN STATE</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Card variant="glow" glowColor="#9d4edd" style={styles.timerCard}>
            <Wind color="#9d4edd" size={40} style={styles.icon} />
            
            {isSettingTime ? (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>SET MEDITATION TIME (MINS)</Text>
                <TextInput
                  style={[styles.input, {borderColor: '#9d4edd'}]}
                  value={customMinutes}
                  onChangeText={setCustomMinutes}
                  keyboardType="numeric"
                  placeholder="10"
                  placeholderTextColor="#444"
                />
                <NeonButton title="APPLY TIME" onPress={applyCustomTime} color="#9d4edd" />
              </View>
            ) : (
              <>
                <Text style={[styles.timerText, {color: '#9d4edd'}]}>{formatTime(timeLeft)}</Text>
                <TouchableOpacity onPress={() => setIsSettingTime(true)}>
                   <Text style={[styles.setTimeBtn, {color: '#9d4edd'}]}>EDIT DURATION</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.controls}>
              <TouchableOpacity onPress={toggleTimer} style={[styles.controlBtn, {borderColor: '#9d4edd'}]}>
                {isActive ? <Pause color="#fff" size={32} /> : <Play color="#fff" size={32} />}
              </TouchableOpacity>
              <TouchableOpacity onPress={resetTimer} style={[styles.controlBtn, {borderColor: '#9d4edd'}]}>
                <RotateCcw color="#fff" size={32} />
              </TouchableOpacity>
            </View>
          </Card>
          
          <Text style={styles.hint}>Calm your mind to increase Focus and Perception.</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(5, 5, 5, 0.85)' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(157, 78, 221, 0.1)',
  },
  headerTitle: {
    color: '#9d4edd',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  content: { padding: 24, alignItems: 'center' },
  timerCard: {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
    gap: 30,
    backgroundColor: 'rgba(17, 17, 17, 0.9)',
  },
  icon: { marginBottom: 10 },
  timerText: {
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  setTimeBtn: {
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    letterSpacing: 1,
  },
  controls: { flexDirection: 'row', gap: 40, marginTop: 20 },
  controlBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inputContainer: { width: '100%', gap: 16, paddingHorizontal: 20 },
  label: { color: '#888', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  input: {
    backgroundColor: '#050505',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  hint: {
    color: '#555',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 24,
    textAlign: 'center',
  }
});