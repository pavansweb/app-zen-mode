import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  glow?: boolean;
}

export function ProgressBar({ progress, color = '#00e5ff', height = 8, glow = true }: ProgressBarProps) {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    setInternalProgress(progress);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(`${Math.max(0, Math.min(100, internalProgress * 100))}%`, {
        damping: 15,
        stiffness: 90,
      }),
    };
  });

  return (
    <View
      style={[
        styles.container,
        { height, borderRadius: height / 2, backgroundColor: '#222222' }
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            borderRadius: height / 2,
            shadowColor: glow ? color : 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: glow ? 0.8 : 0,
            shadowRadius: glow ? 6 : 0,
            elevation: glow ? 4 : 0,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});