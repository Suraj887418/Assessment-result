import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ListRenderItem,
  Platform,
} from 'react-native';
import { AssessmentItem, FilterCategory, AssessmentSummary } from '../types/assessment';
import { DEFAULT_ASSESSMENTS, generateLargeDataset } from '../constants/mockData';
import { COLORS, SCORE_THRESHOLD } from '../constants/theme';
import { HeaderSummary } from '../components/HeaderSummary';
import { FilterBar } from '../components/FilterBar';
import { SearchBar } from '../components/SearchBar';
import { AssessmentCard } from '../components/AssessmentCard';
import { EmptyState } from '../components/EmptyState';
import { DemoSwitcher, DemoMode } from '../components/DemoSwitcher';

export const AssessmentResultsScreen: React.FC = () => {
  const [demoMode, setDemoMode] = useState<DemoMode>('standard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('completed');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Load raw dataset according to Demo Mode
  const rawData = useMemo<AssessmentItem[]>(() => {
    switch (demoMode) {
      case 'empty':
        return [];
      case 'large_volume':
        return generateLargeDataset(120);
      case 'standard':
      default:
        return DEFAULT_ASSESSMENTS;
    }
  }, [demoMode]);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  }, []);

  // Compute overall summary statistics for completed items
  const summary = useMemo<AssessmentSummary>(() => {
    const completedItems = rawData.filter(
      (item) => item.status === 'completed' && item.score !== undefined
    );
    const totalCompleted = completedItems.length;
    const totalPending = rawData.filter((item) => item.status === 'pending').length;

    if (totalCompleted === 0) {
      return {
        total: rawData.length,
        completed: 0,
        pending: totalPending,
        averageScore: 0,
        goodCount: 0,
        needsImprovementCount: 0,
      };
    }

    const totalScore = completedItems.reduce((acc, curr) => acc + (curr.score ?? 0), 0);
    const avg = Math.round(totalScore / totalCompleted);
    const good = completedItems.filter((i) => (i.score ?? 0) >= SCORE_THRESHOLD).length;
    const needsImp = totalCompleted - good;

    return {
      total: rawData.length,
      completed: totalCompleted,
      pending: totalPending,
      averageScore: avg,
      goodCount: good,
      needsImprovementCount: needsImp,
    };
  }, [rawData]);

  // Compute counts for each filter chip
  const filterCounts = useMemo<Record<FilterCategory, number>>(() => {
    return {
      all: rawData.length,
      completed: rawData.filter((item) => item.status === 'completed').length,
      recorded: rawData.filter((item) => item.type === 'recorded' && item.status === 'completed').length,
      text: rawData.filter((item) => item.type === 'text' && item.status === 'completed').length,
      needs_improvement: rawData.filter(
        (item) => item.status === 'completed' && (item.score ?? 0) < SCORE_THRESHOLD
      ).length,
      pending: rawData.filter((item) => item.status === 'pending').length,
    };
  }, [rawData]);

  // Filter and Search dataset
  const filteredData = useMemo<AssessmentItem[]>(() => {
    let result = rawData;

    // 1. Filter Category
    switch (selectedFilter) {
      case 'completed':
        result = result.filter((item) => item.status === 'completed');
        break;
      case 'recorded':
        result = result.filter((item) => item.type === 'recorded' && item.status === 'completed');
        break;
      case 'text':
        result = result.filter((item) => item.type === 'text' && item.status === 'completed');
        break;
      case 'needs_improvement':
        result = result.filter(
          (item) => item.status === 'completed' && (item.score ?? 0) < SCORE_THRESHOLD
        );
        break;
      case 'pending':
        result = result.filter((item) => item.status === 'pending');
        break;
      case 'all':
      default:
        // No status filter
        break;
    }

    // 2. Search Query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          (item.feedback && item.feedback.toLowerCase().includes(q)) ||
          (item.category && item.category.toLowerCase().includes(q))
      );
    }

    return result;
  }, [rawData, selectedFilter, searchQuery]);

  // Performance-optimized FlatList renderItem & keyExtractor
  const renderItem: ListRenderItem<AssessmentItem> = useCallback(
    ({ item }) => <AssessmentCard item={item} />,
    []
  );

  const keyExtractor = useCallback((item: AssessmentItem) => item.id, []);

  // Header component for FlatList
  const renderListHeader = useMemo(() => {
    return (
      <View style={styles.listHeaderContainer}>
        <HeaderSummary summary={summary} />
        <SearchBar
          query={searchQuery}
          onChangeQuery={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
        <FilterBar
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          counts={filterCounts}
        />
      </View>
    );
  }, [summary, searchQuery, selectedFilter, filterCounts]);

  // Empty component for FlatList
  const renderListEmpty = useCallback(() => {
    if (rawData.length === 0) {
      return (
        <EmptyState
          title="No Assessments Yet"
          description="You don't have any completed assessments. Take your first coaching question to get AI-powered evaluation and scoring."
          iconName="sparkles-outline"
          actionText="Load Standard Demo"
          onAction={() => setDemoMode('standard')}
        />
      );
    }

    return (
      <EmptyState
        title="No Matching Results"
        description={`No assessments found matching your query or active filter. Try resetting filters.`}
        iconName="search-outline"
        actionText="Reset Filters"
        onAction={() => {
          setSearchQuery('');
          setSelectedFilter('all');
        }}
      />
    );
  }, [rawData.length, selectedFilter]);

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.deviceContainer}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderListEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // Performance optimizations for large lists
          initialNumToRender={8}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews={Platform.OS === 'android'}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        />

        {/* Bottom Floating Dataset Mode Switcher for Evaluators */}
        <DemoSwitcher
          currentMode={demoMode}
          onSelectMode={setDemoMode}
          totalCount={rawData.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
  },
  deviceContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 680, // Responsive container: sleek mobile feel on web, 100% on phone
    backgroundColor: '#FFFFFF',
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.06)',
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderLeftColor: '#E2E8F0',
          borderRightColor: '#E2E8F0',
        }
      : {}),
  },
  listContent: {
    paddingBottom: 110, // Extra bottom padding so last card is never cut off by switcher
  },
  listHeaderContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 4,
  },
});
