export interface UserStats {
  strength: number;
  intelligence: number;
  discipline: number;
  focus: number;
  endurance: number;
  knowledge: number;
  charisma: number;
}

export interface PlayerState {
  name: string;
  profileImage?: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  title: string;
  stats: UserStats;
  streak: number;
  lastActiveDate?: string;
  streakHistory: boolean[]; // Last 7 days (true = completed at least one quest)
  totalQuestsCompleted: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'daily' | 'side' | 'challenge';
  difficulty: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  xpReward: number;
  statRewards: Partial<UserStats>;
  completed: boolean;
  createdAt: string;
  reflection?: string;
  durationMinutes?: number; // For Shadow Training
}