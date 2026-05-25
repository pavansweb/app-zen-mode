import { View, Text, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  glowColor?: string;
  variant?: 'default' | 'glow';
}

export function Card({ children, style, glowColor = '#00e5ff', variant = 'default', ...props }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: '#111111',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: variant === 'glow' ? glowColor : '#222222',
          shadowColor: variant === 'glow' ? glowColor : 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: variant === 'glow' ? 0.3 : 0,
          shadowRadius: variant === 'glow' ? 8 : 0,
          elevation: variant === 'glow' ? 5 : 0,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}