import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../../components/ui/Card';
import { NeonButton } from '../../components/ui/NeonButton';
import { ArrowLeft, Play, Pause, RotateCcw, Brain, Clock } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { Images } from '../../assets/images';

export default function PomodoroScreen() {
  const router = useRouter();
  const [customMinutes, setCustomMinutes] = useState('25');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
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
    setTimeLeft(parseInt(customMinutes) * 60 || 25 * 60);
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
            <ArrowLeft color="#00e5ff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>POMODORO PROTOCOL</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Card variant="glow" style={styles.timerCard}>
            <Brain color="#00e5ff" size={40} style={styles.icon} />
            
            {isSettingTime ? (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>SET CUSTOM DURATION (MINS)</Text>
                <TextInput
                  style={styles.input}
                  value={customMinutes}
                  onChangeText={setCustomMinutes}
                  keyboardType="numeric"
                  placeholder="25"
                  placeholderTextColor="#444"
                />
                <NeonButton title="APPLY TIME" onPress={applyCustomTime} color="#00e5ff" />
              </View>
            ) : (
              <>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                <TouchableOpacity onPress={() => setIsSettingTime(true)}>
                   <Text style={styles.setTimeBtn}>EDIT DURATION</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.controls}>
              <TouchableOpacity onPress={toggleTimer} style={styles.controlBtn}>
                {isActive ? <Pause color="#fff" size={32} /> : <Play color="#fff" size={32} />}
              </TouchableOpacity>
              <TouchableOpacity onPress={resetTimer} style={styles.controlBtn}>
                <RotateCcw color="#fff" size={32} />
              </TouchableOpacity>
            </View>
          </Card>
          
          <Text style={styles.hint}>Deep work cycle for Maximum Intelligence gain.</Text>
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
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
  },
  headerTitle: {
    color: '#00e5ff',
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
    color: '#fff',
    fontSize: 80,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  setTimeBtn: {
    color: '#00e5ff',
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
    borderColor: '#00e5ff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inputContainer: { width: '100%', gap: 16, paddingHorizontal: 20 },
  label: { color: '#888', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  input: {
    backgroundColor: '#050505',
    borderWidth: 1,
    borderColor: '#333',
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