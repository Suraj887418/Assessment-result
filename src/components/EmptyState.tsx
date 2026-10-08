import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface EmptyStateProps {
  title?: string;
  description?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = React.memo(
  ({
    title = 'No Assessments Found',
    description = 'You have not completed any assessments yet. Take your first AI coaching assessment to see detailed feedback here.',
    iconName = 'document-text-outline',
    actionText = 'Start New Assessment',
    onAction,
  }) => {
    return (
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Ionicons name={iconName} size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {onAction && actionText ? (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onAction}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Ionicons name="sparkles" size={16} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{actionText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderStyle: 'dashed',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 20,
    maxWidth: 300,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
