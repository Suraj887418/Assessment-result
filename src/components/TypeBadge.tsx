import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssessmentType } from '../types/assessment';
import { COLORS } from '../constants/theme';

interface TypeBadgeProps {
  type: AssessmentType;
  durationOrWords?: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = React.memo(({ type, durationOrWords }) => {
  const isRecorded = type === 'recorded';

  return (
    <View
      style={[
        styles.container,
        isRecorded ? styles.recordedContainer : styles.textContainer,
      ]}
      accessibilityLabel={`Assessment type: ${isRecorded ? 'Recorded response' : 'Text response'}`}
    >
      <Ionicons
        name={isRecorded ? 'mic-outline' : 'document-text-outline'}
        size={14}
        color={isRecorded ? COLORS.recordedBadgeText : COLORS.textBadgeText}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          isRecorded ? styles.recordedText : styles.textBadgeText,
        ]}
      >
        {isRecorded ? 'Recorded' : 'Text'}
      </Text>
      {durationOrWords ? (
        <Text style={styles.metaText}>• {durationOrWords}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  recordedContainer: {
    backgroundColor: COLORS.recordedBadgeBg,
    borderColor: COLORS.recordedBadgeBorder,
  },
  textContainer: {
    backgroundColor: COLORS.textBadgeBg,
    borderColor: COLORS.textBadgeBorder,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  recordedText: {
    color: COLORS.recordedBadgeText,
  },
  textBadgeText: {
    color: COLORS.textBadgeText,
  },
  metaText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
});
