import { create } from 'zustand';
import { PlayerState, Quest, UserStats } from '../types';

interface PlayerStore {
  player: PlayerState;
  quests: Quest[];
  gainXp: (amount: number) => void;
  completeQuest: (questId: string, reflection?: string) => void;
  addQuest: (quest: Omit<Quest, 'id' | 'createdAt' | 'completed'>) => void;
  deleteQuest: (questId: string) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  updateProfile: (updates: Partial<Pick<PlayerState, 'name' | 'profileImage' | 'title'>>) => void;
  checkStreak: () => void;
}

const calculateNextLevelXp = (level: number) => Math.floor(100 * Math.pow(1.5, level - 1));

const getRankForLevel = (level: number): PlayerState['rank'] => {
  if (level >= 50) return 'S';
  if (level >= 40) return 'A';
  if (level >= 30) return 'B';
  if (level >= 20) return 'C';
  if (level >= 10) return 'D';
  return 'E';
};

const INITIAL_PLAYER: PlayerState = {
  name: 'Player',
  profileImage: undefined,
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  rank: 'E',
  title: 'Novice',
  stats: {
    strength: 10,
    intelligence: 10,
    discipline: 10,
    focus: 10,
    endurance: 10,
    knowledge: 10,
    charisma: 10,
  },
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakHistory: [false, false, false, false, false, false, false],
  totalQuestsCompleted: 0,
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: INITIAL_PLAYER,
  quests: [
    {
      id: '1',
      title: '100 Pushups',
      description: 'Complete 100 pushups today',
      type: 'daily',
      difficulty: 'D',
      xpReward: 50,
      statRewards: { strength: 2, endurance: 1 },
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Deep Work Session',
      description: 'Shadow Training: Focus for 50 minutes',
      type: 'main',
      difficulty: 'C',
      xpReward: 100,
      statRewards: { focus: 3, intelligence: 1, discipline: 2 },
      completed: false,
      createdAt: new Date().toISOString(),
      durationMinutes: 50,
    }
  ],
  
  gainXp: (amount) => set((state) => {
    let { level, xp, nextLevelXp, rank } = state.player;
    xp += amount;
    
    while (xp >= nextLevelXp) {
      xp -= nextLevelXp;
      level += 1;
      nextLevelXp = calculateNextLevelXp(level);
      rank = getRankForLevel(level);
    }
    
    return {
      player: { ...state.player, level, xp, nextLevelXp, rank }
    };
  }),

  updateStats: (statIncreases) => set((state) => {
    const newStats = { ...state.player.stats };
    Object.keys(statIncreases).forEach((key) => {
      const k = key as keyof UserStats;
      newStats[k] += statIncreases[k] || 0;
    });
    return { player: { ...state.player, stats: newStats } };
  }),

  completeQuest: (questId, reflection) => set((state) => {
    const quest = state.quests.find(q => q.id === questId);
    if (!quest) return state;

    const isCompleting = !quest.completed;
    let { level, xp, nextLevelXp, rank, stats, totalQuestsCompleted, streakHistory } = state.player;
    
    if (isCompleting) {
      xp += quest.xpReward;
      while (xp >= nextLevelXp) {
        xp -= nextLevelXp;
        level += 1;
        nextLevelXp = calculateNextLevelXp(level);
        rank = getRankForLevel(level);
      }

      const newStats = { ...stats };
      if (quest.statRewards) {
        Object.keys(quest.statRewards).forEach((key) => {
          const k = key as keyof UserStats;
          newStats[k] += quest.statRewards[k] || 0;
        });
      }

      // Update streak history for today
      const newStreakHistory = [...streakHistory];
      newStreakHistory[newStreakHistory.length - 1] = true;

      return {
        player: {
          ...state.player,
          level,
          xp,
          nextLevelXp,
          rank,
          stats: newStats,
          totalQuestsCompleted: totalQuestsCompleted + 1,
          streakHistory: newStreakHistory,
        },
        quests: state.quests.map(q => q.id === questId ? { ...q, completed: true, reflection } : q)
      };
    } else {
      xp -= quest.xpReward;
      while (xp < 0 && level > 1) {
        level -= 1;
        nextLevelXp = calculateNextLevelXp(level);
        xp += nextLevelXp;
        rank = getRankForLevel(level);
      }
      if (xp < 0) xp = 0;

      const newStats = { ...stats };
      if (quest.statRewards) {
        Object.keys(quest.statRewards).forEach((key) => {
          const k = key as keyof UserStats;
          newStats[k] = Math.max(10, newStats[k] - (quest.statRewards[k] || 0));
        });
      }

      return {
        player: {
          ...state.player,
          level,
          xp,
          nextLevelXp,
          rank,
          stats: newStats,
          totalQuestsCompleted: Math.max(0, totalQuestsCompleted - 1),
        },
        quests: state.quests.map(q => q.id === questId ? { ...q, completed: false } : q)
      };
    }
  }),

  addQuest: (questData) => set((state) => ({
    quests: [
      {
        ...questData,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
        completed: false,
      },
      ...state.quests,
    ]
  })),

  deleteQuest: (questId) => set((state) => ({
    quests: state.quests.filter(q => q.id !== questId)
  })),

  updateProfile: (updates) => set((state) => ({
    player: { ...state.player, ...updates }
  })),

  checkStreak: () => set((state) => {
    const today = new Date().toISOString().split('T')[0];
    const lastActive = state.player.lastActiveDate;
    
    if (today === lastActive) return state;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = state.player.streak;
    if (lastActive === yesterdayStr) {
      // Keep streak going (it will be incremented on quest completion or we can just leave it)
    } else if (lastActive !== today) {
      newStreak = 0; // Lost streak
    }

    // Shift streak history
    const newHistory = [...state.player.streakHistory.slice(1), false];

    return {
      player: {
        ...state.player,
        streak: newStreak,
        lastActiveDate: today,
        streakHistory: newHistory,
      }
    };
  }),
}));