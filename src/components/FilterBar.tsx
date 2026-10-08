import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import { FilterCategory } from '../types/assessment';
import { COLORS } from '../constants/theme';

interface FilterBarProps {
  selectedFilter: FilterCategory;
  onSelectFilter: (filter: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

const FILTER_ITEMS: { id: FilterCategory; label: string }[] = [
  { id: 'completed', label: 'Completed' },
  { id: 'all', label: 'All' },
  { id: 'recorded', label: 'Recorded' },
  { id: 'text', label: 'Text' },
  { id: 'needs_improvement', label: 'Needs Imp.' },
  { id: 'pending', label: 'Pending' },
];

export const FilterBar: React.FC<FilterBarProps> = React.memo(
  ({ selectedFilter, onSelectFilter, counts }) => {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          {FILTER_ITEMS.map((item) => {
            const isSelected = selectedFilter === item.id;
            const count = counts[item.id] ?? 0;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.chip,
                  isSelected ? styles.chipSelected : styles.chipUnselected,
                ]}
                onPress={() => onSelectFilter(item.id)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                  ]}
                >
                  {item.label}
                </Text>
                <View
                  style={[
                    styles.countBadge,
                    isSelected
                      ? styles.countBadgeSelected
                      : styles.countBadgeUnselected,
                  ]}
                >
                  <Text
                    style={[
                      styles.countText,
                      isSelected
                        ? styles.countTextSelected
                        : styles.countTextUnselected,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  container: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipUnselected: {
    backgroundColor: COLORS.cardBg,
    borderColor: COLORS.cardBorder,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  chipTextUnselected: {
    color: COLORS.textSecondary,
  },
  countBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  countBadgeUnselected: {
    backgroundColor: '#F1F5F9',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
  countTextSelected: {
    color: '#FFFFFF',
  },
  countTextUnselected: {
    color: COLORS.textSecondary,
  },
});
