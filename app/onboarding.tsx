import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NeonButton } from '../components/ui/NeonButton';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleStart = async () => {
    await AsyncStorage.setItem('has_launched', 'true');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.systemText}>[ SYSTEM BOOTING... ]</Text>
        <Text style={styles.title}>AWAKENING</Text>
        <Text style={styles.desc}>
          You have been chosen as a Player.
          Your actions in reality will determine your power in the System.
          Complete quests, increase your stats, and rank up.
          Failure to act will leave you at E-Rank forever.
        </Text>
        
        <View style={styles.buttonContainer}>
          <NeonButton 
            title="ACCEPT QUEST" 
            onPress={handleStart} 
            color="#00e5ff"
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  systemText: {
    color: '#00e5ff',
    fontFamily: 'monospace',
    letterSpacing: 2,
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: 'bold',
    letterSpacing: 8,
    textShadowColor: '#00e5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  desc: {
    color: '#aaaaaa',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 40,
    width: '100%',
  },
  button: {
    width: '100%',
  }
});