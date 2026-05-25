import { Tabs } from 'expo-router';
import { Home, Swords, User, Trophy, BarChart2 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#050505',
          borderBottomWidth: 1,
          borderBottomColor: '#111111',
        },
        headerTintColor: '#00e5ff',
        tabBarStyle: {
          backgroundColor: '#050505',
          borderTopWidth: 1,
          borderTopColor: '#111111',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#00e5ff',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Status',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: 'Quests',
          tabBarIcon: ({ color, size }) => <Swords color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Trophies',
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}