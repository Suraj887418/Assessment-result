import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PerformanceLevel } from '../types/assessment';
import { COLORS, SCORE_THRESHOLD } from '../constants/theme';

interface PerformanceBadgeProps {
  score?: number;
  status: 'completed' | 'pending';
}

export const getPerformanceLevel = (score?: number): PerformanceLevel | 'Pending' => {
  if (score === undefined) return 'Pending';
  return score >= SCORE_THRESHOLD ? 'Good' : 'Needs Improvement';
};

export const PerformanceBadge: React.FC<PerformanceBadgeProps> = React.memo(({ score, status }) => {
  if (status === 'pending' || score === undefined) {
    return (
      <View style={[styles.container, styles.pendingContainer]}>
        <Ionicons name="time-outline" size={13} color={COLORS.pendingText} style={styles.icon} />
        <Text style={[styles.text, styles.pendingText]}>Pending Evaluation</Text>
      </View>
    );
  }

  const isGood = score >= SCORE_THRESHOLD;

  return (
    <View
      style={[
        styles.container,
        isGood ? styles.goodContainer : styles.needsImprovementContainer,
      ]}
      accessibilityLabel={`Performance rating: ${isGood ? 'Good' : 'Needs Improvement'}`}
    >
      <Ionicons
        name={isGood ? 'checkmark-circle' : 'alert-circle'}
        size={13}
        color={isGood ? COLORS.good : COLORS.needsImprovement}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          isGood ? styles.goodText : styles.needsImprovementText,
        ]}
      >
        {isGood ? 'Good' : 'Needs Improvement'}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  goodContainer: {
    backgroundColor: COLORS.goodLight,
    borderColor: COLORS.goodBorder,
  },
  needsImprovementContainer: {
    backgroundColor: COLORS.needsImprovementLight,
    borderColor: COLORS.needsImprovementBorder,
  },
  pendingContainer: {
    backgroundColor: COLORS.pendingBg,
    borderColor: COLORS.pendingBorder,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  goodText: {
    color: '#047857', // Darker green for accessibility contrast
  },
  needsImprovementText: {
    color: '#B45309', // Darker amber for contrast
  },
  pendingText: {
    color: COLORS.pendingText,
  },
});
