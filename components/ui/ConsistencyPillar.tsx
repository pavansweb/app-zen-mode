import { View, Text, StyleSheet } from 'react-native';

interface ConsistencyPillarProps {
  history: boolean[]; // 7 booleans
}

export function ConsistencyPillar({ history }: ConsistencyPillarProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CONSISTENCY PILLAR</Text>
      <View style={styles.grid}>
        {history.map((active, index) => (
          <View key={index} style={styles.dayColumn}>
            <View 
              style={[
                styles.dot, 
                active ? styles.activeDot : styles.inactiveDot,
                active && styles.glow
              ]} 
            />
            <Text style={[styles.dayText, active && styles.activeText]}>{days[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayColumn: {
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  activeDot: {
    backgroundColor: '#00e5ff',
    borderColor: '#00e5ff',
  },
  inactiveDot: {
    backgroundColor: 'transparent',
    borderColor: '#333',
  },
  glow: {
    shadowColor: '#00e5ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  dayText: {
    color: '#444',
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#00e5ff',
  }
});