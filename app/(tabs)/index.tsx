import { View, Text, ScrollView, StyleSheet, ImageBackground, Modal, TextInput } from 'react-native';
import { usePlayerStore } from '../../store/usePlayerStore';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Card } from '../../components/ui/Card';
import { ConsistencyPillar } from '../../components/ui/ConsistencyPillar';
import { Shield, Zap, Target } from 'lucide-react-native';
import { Images } from '../../assets/images';
import { useEffect } from 'react';

export default function StatusScreen() {
  const { player, checkStreak } = usePlayerStore();
  const xpProgress = player.xp / player.nextLevelXp;

  useEffect(() => {
    checkStreak();
  }, []);

  return (
    <ImageBackground 
      source={Images.homepage} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          {/* Player Header */}
          <View style={styles.header}>
            <Text style={styles.titleText}>{player.title}</Text>
            <Text style={styles.nameText}>{player.name}</Text>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{player.rank} RANK</Text>
            </View>
          </View>

          {/* Level & XP */}
          <Card variant="glow" glowColor="#00e5ff" style={styles.levelCard}>
            <View style={styles.levelHeader}>
              <Text style={styles.levelLabel}>LEVEL</Text>
              <Text style={styles.levelNumber}>{player.level}</Text>
            </View>
            <ProgressBar progress={xpProgress} color="#00e5ff" height={12} />
            <Text style={styles.xpText}>{player.xp} / {player.nextLevelXp} XP</Text>
          </Card>

          {/* Consistency Pillar */}
          <ConsistencyPillar history={player.streakHistory} />

          {/* Quick Stats */}
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Zap color="#ffcc00" size={24} />
              <Text style={styles.statValue}>{player.stats.strength}</Text>
              <Text style={styles.statLabel}>STR</Text>
            </Card>
            <Card style={styles.statCard}>
              <Target color="#00e5ff" size={24} />
              <Text style={styles.statValue}>{player.stats.focus}</Text>
              <Text style={styles.statLabel}>FOC</Text>
            </Card>
            <Card style={styles.statCard}>
              <Shield color="#9d4edd" size={24} />
              <Text style={styles.statValue}>{player.stats.endurance}</Text>
              <Text style={styles.statLabel}>END</Text>
            </Card>
          </View>

          {/* Daily Motivation or System Message */}
          <Card variant="glow" glowColor="#9d4edd" style={styles.messageCard}>
            <Text style={styles.systemHeader}>[ SYSTEM MESSAGE ]</Text>
            <Text style={styles.systemMessage}>
              "Arise. A new daily quest has been issued. Failure to comply will result in a penalty."
            </Text>
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
    backgroundColor: 'rgba(5, 5, 5, 0.7)',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 40,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  titleText: {
    color: '#00e5ff',
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  nameText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 4,
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  rankBadge: {
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    borderColor: '#00e5ff',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  rankText: {
    color: '#00e5ff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  levelCard: {
    paddingVertical: 20,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  levelLabel: {
    color: '#888888',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  levelNumber: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  xpText: {
    color: '#888888',
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
  },
  messageCard: {
    marginTop: 8,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
  },
  systemHeader: {
    color: '#9d4edd',
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1,
  },
  systemMessage: {
    color: '#cccccc',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});