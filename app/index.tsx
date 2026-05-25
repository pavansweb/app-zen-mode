import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('has_launched').then(value => {
      if (value === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, backgroundColor: '#050505', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00e5ff" />
      </View>
    );
  }

  if (isFirstLaunch) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}