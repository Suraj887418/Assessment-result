import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface SearchBarProps {
  query: string;
  onChangeQuery: (text: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ query, onChangeQuery, onClear }) => {
    return (
      <View style={styles.container}>
        <Ionicons name="search-outline" size={18} color={COLORS.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search question, category, or feedback..."
          placeholderTextColor={COLORS.textMuted}
          value={query}
          onChangeText={onChangeQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={onClear}
            style={styles.clearButton}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    height: 48,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 10,
  },
  clearButton: {
    padding: 4,
  },
});
