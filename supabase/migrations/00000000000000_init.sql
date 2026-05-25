-- Create tables for the Solo Leveling App

CREATE TABLE public.users (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  level int DEFAULT 1,
  xp int DEFAULT 0,
  next_level_xp int DEFAULT 100,
  rank text DEFAULT 'E',
  title text DEFAULT 'Novice',
  streak int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.user_stats (
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  strength int DEFAULT 10,
  intelligence int DEFAULT 10,
  discipline int DEFAULT 10,
  focus int DEFAULT 10,
  endurance int DEFAULT 10,
  knowledge int DEFAULT 10,
  charisma int DEFAULT 10
);

CREATE TABLE public.quests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL, -- 'main', 'daily', 'side', 'challenge'
  difficulty text DEFAULT 'E',
  xp_reward int DEFAULT 10,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone
);

CREATE TABLE public.quest_stat_rewards (
  quest_id uuid REFERENCES public.quests(id) ON DELETE CASCADE,
  stat_name text NOT NULL,
  amount int DEFAULT 1,
  PRIMARY KEY (quest_id, stat_name)
);

CREATE TABLE public.achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  icon text
);

CREATE TABLE public.user_achievements (
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id uuid REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, achievement_id)
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_stat_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own stats" ON public.user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON public.user_stats FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own quests" ON public.quests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quests" ON public.quests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own quests" ON public.quests FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own quests" ON public.quests FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view quest rewards" ON public.quest_stat_rewards FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.quests WHERE quests.id = quest_stat_rewards.quest_id AND quests.user_id = auth.uid())
);
CREATE POLICY "Users can view own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
