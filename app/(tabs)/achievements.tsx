import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Card } from '../../components/ui/Card';
import { Trophy, Lock } from 'lucide-react-native';
import { Images } from '../../assets/images';

const ACHIEVEMENTS = [
  { id: '1', title: 'Awakening', desc: 'Complete your first quest', unlocked: true },
  { id: '2', title: 'Demon Slayer', desc: 'Reach Level 10', unlocked: false },
  { id: '3', title: 'Relentless', desc: 'Maintain a 7-day streak', unlocked: false },
  { id: '4', title: 'Iron Will', desc: 'Reach 50 Strength', unlocked: false },
];

export default function AchievementsScreen() {
  return (
    <ImageBackground 
      source={Images.trophies} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>TROPHIES</Text>
          
          <View style={styles.grid}>
            {ACHIEVEMENTS.map(ach => (
              <Card 
                key={ach.id} 
                variant={ach.unlocked ? 'glow' : 'default'} 
                glowColor="#ffaa00"
                style={[
                  styles.card, 
                  { backgroundColor: ach.unlocked ? 'rgba(17, 17, 17, 0.85)' : 'rgba(17, 17, 17, 0.6)' },
                  !ach.unlocked && { opacity: 0.5 }
                ]}
              >
                <View style={styles.iconContainer}>
                  {ach.unlocked ? (
                    <Trophy color="#ffaa00" size={32} />
                  ) : (
                    <Lock color="#555" size={32} />
                  )}
                </View>
                <Text style={styles.title}>{ach.title}</Text>
                <Text style={styles.desc}>{ach.desc}</Text>
              </Card>
            ))}
          </View>
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
  },
  sectionTitle: {
    color: '#ffaa00',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 170, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    alignItems: 'center',
    paddingVertical: 24,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  desc: {
    color: '#aaaaaa',
    fontSize: 12,
    textAlign: 'center',
  }
});