import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export type DemoMode = 'standard' | 'empty' | 'large_volume';

interface DemoSwitcherProps {
  currentMode: DemoMode;
  onSelectMode: (mode: DemoMode) => void;
  totalCount: number;
}

export const DemoSwitcher: React.FC<DemoSwitcherProps> = React.memo(
  ({ currentMode, onSelectMode, totalCount }) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.labelGroup}>
            <Ionicons name="flask-outline" size={15} color={COLORS.primary} />
            <Text style={styles.headerText}>Tester Dataset Switcher</Text>
          </View>
          <Text style={styles.badgeText}>{totalCount} Items Loaded</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              currentMode === 'standard' && styles.buttonActive,
            ]}
            onPress={() => onSelectMode('standard')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                currentMode === 'standard' && styles.buttonTextActive,
              ]}
            >
              Standard (Prompt)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              currentMode === 'empty' && styles.buttonActive,
            ]}
            onPress={() => onSelectMode('empty')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                currentMode === 'empty' && styles.buttonTextActive,
              ]}
            >
              Empty State
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              currentMode === 'large_volume' && styles.buttonActive,
            ]}
            onPress={() => onSelectMode('large_volume')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.buttonText,
                currentMode === 'large_volume' && styles.buttonTextActive,
              ]}
            >
              100+ Performance
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 6,
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  buttonTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
