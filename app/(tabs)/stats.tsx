import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Images } from '../../assets/images';

export default function StatsScreen() {
  const { player } = usePlayerStore();
  const { stats } = player;

  const statColors: Record<string, string> = {
    strength: '#ff3366',
    intelligence: '#00e5ff',
    discipline: '#00ff88',
    focus: '#ffcc00',
    endurance: '#9d4edd',
    knowledge: '#0055ff',
    charisma: '#ffaa00',
  };

  const getStatProgress = (val: number) => {
    return Math.min(val / 100, 1);
  };

  return (
    <ImageBackground 
      source={Images.quests} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>STATUS WINDOW</Text>
          
          <Card variant="glow" glowColor="#00e5ff" style={styles.statsCard}>
            {Object.entries(stats).map(([statName, value]) => (
              <View key={statName} style={styles.statRow}>
                <View style={styles.statInfo}>
                  <Text style={styles.statName}>{statName.toUpperCase()}</Text>
                  <Text style={styles.statValue}>{value}</Text>
                </View>
                <ProgressBar 
                  progress={getStatProgress(value)} 
                  color={statColors[statName]} 
                  height={8} 
                  glow={true}
                />
              </View>
            ))}
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 5, 5, 0.75)',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 24,
    gap: 16,
  },
  sectionTitle: {
    color: '#00e5ff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statsCard: {
    padding: 20,
    gap: 20,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
  },
  statRow: {
    marginBottom: 16,
  },
  statInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statName: {
    color: '#aaaaaa',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});