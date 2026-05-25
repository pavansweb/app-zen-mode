import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Modal, TextInput } from 'react-native';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Card } from '../../components/ui/Card';
import { NeonButton } from '../../components/ui/NeonButton';
import { CheckCircle, Plus, X } from 'lucide-react-native';
import { Images } from '../../assets/images';
import { useState } from 'react';

export default function QuestsScreen() {
  const { quests, completeQuest, addQuest } = usePlayerStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [completingQuestId, setCompletingQuestId] = useState('');

  // Form State for new quest
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState<'daily' | 'main' | 'side' | 'challenge'>('daily');
  const [newStat, setNewStat] = useState<string>('strength');

  const activeQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'S': return '#ff0055';
      case 'A': return '#ffaa00';
      case 'B': return '#9d4edd';
      case 'C': return '#0055ff';
      case 'D': return '#00e5ff';
      default: return '#888888';
    }
  };

  const handleAddQuest = () => {
    if (!newTitle) return;
    addQuest({
      title: newTitle,
      description: newDesc,
      type: newType,
      difficulty: 'E',
      xpReward: 30,
      statRewards: { [newStat]: 1 },
    });
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleQuestAction = (quest: any) => {
    setCompletingQuestId(quest.id);
    setShowReflectionModal(true);
  };

  const confirmCompletion = () => {
    completeQuest(completingQuestId, reflectionText);
    setShowReflectionModal(false);
    setReflectionText('');
    setCompletingQuestId('');
  };

  return (
    <ImageBackground 
      source={Images.quests} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>ACTIVE QUESTS</Text>
            <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addBtn}>
              <Plus color="#00e5ff" size={24} />
            </TouchableOpacity>
          </View>
          
          {activeQuests.map(quest => (
            <Card key={quest.id} variant="glow" glowColor={getDifficultyColor(quest.difficulty)} style={styles.questCard}>
              <View style={styles.questHeader}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <View style={[styles.badge, { borderColor: getDifficultyColor(quest.difficulty) }]}>
                  <Text style={[styles.badgeText, { color: getDifficultyColor(quest.difficulty) }]}>
                    {quest.difficulty}-Rank
                  </Text>
                </View>
              </View>
              
              <Text style={styles.questDesc}>{quest.description}</Text>
              
              <View style={styles.rewards}>
                <Text style={styles.rewardText}>+{quest.xpReward} XP</Text>
                {quest.statRewards && Object.entries(quest.statRewards).map(([stat, val]) => (
                  <Text key={stat} style={styles.rewardText}>+{val} {stat.toUpperCase().slice(0, 3)}</Text>
                ))}
              </View>

              <NeonButton 
                title="Complete" 
                onPress={() => handleQuestAction(quest)} 
                color="#00ff88"
                style={{ marginTop: 16 }}
              />
            </Card>
          ))}

          {activeQuests.length === 0 && (
            <Text style={styles.emptyText}>All active quests completed. Wait for system update.</Text>
          )}

          {completedQuests.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 24, color: 'rgba(255,255,255,0.4)' }]}>COMPLETED QUESTS</Text>
              {completedQuests.map(quest => (
                <TouchableOpacity key={quest.id} onPress={() => completeQuest(quest.id)}>
                  <Card style={[styles.questCard, { opacity: 0.6, backgroundColor: 'rgba(17, 17, 17, 0.8)' }]}>
                    <View style={styles.questHeader}>
                      <View>
                        <Text style={[styles.questTitle, { textDecorationLine: 'line-through', color: '#888' }]}>{quest.title}</Text>
                        {quest.reflection && (
                          <Text style={styles.reflectionText}>Log: "{quest.reflection}"</Text>
                        )}
                      </View>
                      <CheckCircle color="#00ff88" size={20} />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>

      {/* Add Quest Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Card variant="glow" style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>NEW COMMISSION</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X color="#888" size={24} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Quest Title"
              placeholderTextColor="#444"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              placeholderTextColor="#444"
              multiline
              value={newDesc}
              onChangeText={setNewDesc}
            />

            <Text style={styles.label}>STAT REWARD</Text>
            <View style={styles.statSelector}>
              {['strength', 'focus', 'intelligence', 'discipline'].map(s => (
                <TouchableOpacity 
                  key={s} 
                  onPress={() => setNewStat(s)}
                  style={[styles.statBtn, newStat === s && styles.statBtnActive]}
                >
                  <Text style={[styles.statBtnText, newStat === s && { color: '#000' }]}>{s.toUpperCase().slice(0, 3)}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <NeonButton title="REGISTER QUEST" onPress={handleAddQuest} color="#00e5ff" />
          </Card>
        </View>
      </Modal>

      {/* Reflection Modal */}
      <Modal visible={showReflectionModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Card variant="glow" style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>QUEST COMPLETE</Text>
              <TouchableOpacity onPress={() => setShowReflectionModal(false)}>
                <X color="#888" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>REFLECT ON YOUR PROGRESS</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="What did you achieve? (Optional)"
              placeholderTextColor="#444"
              multiline
              value={reflectionText}
              onChangeText={setReflectionText}
            />
            <NeonButton title="ARCHIVE & CLAIM XP" onPress={confirmCompletion} color="#00ff88" />
          </Card>
        </View>
      </Modal>

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
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00e5ff',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  questCard: {
    marginBottom: 12,
    backgroundColor: 'rgba(17, 17, 17, 0.85)',
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reflectionText: {
    color: '#00e5ff',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  questDesc: {
    color: '#dddddd',
    marginBottom: 12,
  },
  rewards: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  rewardText: {
    color: '#00e5ff',
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#aaaaaa',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#111',
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#00e5ff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  input: {
    backgroundColor: '#050505',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  label: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statBtn: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 8,
    borderRadius: 4,
    width: '23%',
    alignItems: 'center',
  },
  statBtnActive: {
    backgroundColor: '#00e5ff',
    borderColor: '#00e5ff',
  },
  statBtnText: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
  }
});