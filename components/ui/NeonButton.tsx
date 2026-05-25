import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface NeonButtonProps {
  onPress: () => void;
  title: string;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function NeonButton({ onPress, title, color = '#00e5ff', style, textStyle, disabled = false }: NeonButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          borderColor: disabled ? '#444' : color,
          shadowColor: disabled ? 'transparent' : color,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: disabled ? '#888' : color }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});