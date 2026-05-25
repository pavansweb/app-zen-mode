import { View, Text, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Card } from '../../components/ui/Card';
import { NeonButton } from '../../components/ui/NeonButton';
import { Camera, User, Edit2, Brain, Wind, ShieldAlert, ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { Images } from '../../assets/images';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { player, updateProfile } = usePlayerStore();
  const [name, setName] = useState(player.name);
  const [title, setTitle] = useState(player.title);
  const router = useRouter();

  const handleSave = () => {
    updateProfile({ name, title });
  };

  return (
    <ImageBackground 
      source={Images.profile} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>PLAYER INFO</Text>

          <View style={styles.pfpContainer}>
            <View style={styles.pfpWrapper}>
              {player.profileImage ? (
                <Image source={{ uri: player.profileImage }} style={styles.pfp} />
              ) : (
                <View style={styles.pfpPlaceholder}>
                  <User color="#555" size={60} />
                </View>
              )}
              <TouchableOpacity style={styles.cameraBtn}>
                <Camera color="#00e5ff" size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.rankBadgeText}>{player.rank} RANK</Text>
          </View>

          <Card variant="glow" glowColor="#00e5ff" style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CODENAME</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name..."
                  placeholderTextColor="#444"
                />
                <Edit2 color="#00e5ff" size={16} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>TITLE</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter title..."
                  placeholderTextColor="#444"
                />
                <Edit2 color="#00e5ff" size={16} />
              </View>
            </View>

            <NeonButton 
              title="UPDATE SYSTEM DATA" 
              onPress={handleSave} 
              color="#00e5ff"
              style={{ marginTop: 10 }}
            />
          </Card>

          <Text style={styles.sectionTitle}>SYSTEM EXTRAS</Text>
          
          <View style={styles.extrasList}>
            <TouchableOpacity onPress={() => router.push('/extras/pomodoro')} style={styles.extraRow}>
               <View style={styles.extraInfo}>
                 <Brain color="#00e5ff" size={24} />
                 <Text style={styles.extraLabel}>POMODORO PROTOCOL</Text>
               </View>
               <ArrowRight color="#444" size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/extras/meditation')} style={styles.extraRow}>
               <View style={styles.extraInfo}>
                 <Wind color="#9d4edd" size={24} />
                 <Text style={styles.extraLabel}>ZEN STATE (MEDITATION)</Text>
               </View>
               <ArrowRight color="#444" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.extraRow, {opacity: 0.5}]}>
               <View style={styles.extraInfo}>
                 <ShieldAlert color="#ff3366" size={24} />
                 <Text style={styles.extraLabel}>SYSTEM BLOCKER (LOCKED)</Text>
               </View>
               <ArrowRight color="#222" size={20} />
            </TouchableOpacity>
          </View>

          <Card style={styles.statsOverview}>
            <Text style={styles.overviewTitle}>SYSTEM OVERVIEW</Text>
            <View style={styles.overviewGrid}>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>LEVEL</Text>
                <Text style={styles.overviewValue}>{player.level}</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>COMPLETED</Text>
                <Text style={styles.overviewValue}>{player.totalQuestsCompleted}</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>STREAK</Text>
                <Text style={styles.overviewValue}>{player.streak}D</Text>
              </View>
            </View>
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
    gap: 20,
  },
  sectionTitle: {
    color: '#00e5ff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  pfpContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  pfpWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  pfp: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#00e5ff',
  },
  pfpPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    borderWidth: 2,
    borderColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#050505',
    borderWidth: 1,
    borderColor: '#00e5ff',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeText: {
    color: '#00e5ff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  formCard: {
    gap: 20,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 4,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 0,
  },
  extrasList: {
    gap: 12,
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
    padding: 20,
  },
  extraInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  extraLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statsOverview: {
    padding: 20,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
  },
  overviewTitle: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 2,
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewLabel: {
    color: '#444',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  overviewValue: {
    color: '#00e5ff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});