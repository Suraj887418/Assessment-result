import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssessmentSummary } from '../types/assessment';
import { COLORS, SCORE_THRESHOLD } from '../constants/theme';
import { VaniLogo } from './VaniLogo';

interface HeaderSummaryProps {
  summary: AssessmentSummary;
}

export const HeaderSummary: React.FC<HeaderSummaryProps> = React.memo(({ summary }) => {
  const isAvgGood = summary.averageScore >= SCORE_THRESHOLD;

  return (
    <View style={styles.container}>
      {/* Brand & Platform Header */}
      <View style={styles.brandBar}>
        <VaniLogo size="medium" showCoachTag={true} />

        {/* Status Chip */}
        <View style={styles.platformBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.platformText}>AI Evaluated</Text>
        </View>
      </View>

      {/* Screen Title */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>Assessment Results</Text>
        <Text style={styles.subtitle}>
          Track your workplace communication performance & AI-driven insights
        </Text>
      </View>

      {/* Analytics KPI Cards */}
      <View style={styles.kpiGrid}>
        {/* Average Score KPI */}
        <View style={[styles.kpiCard, styles.mainKpiCard]}>
          <Text style={styles.kpiLabel}>Average Score</Text>
          <View style={styles.scoreRow}>
            <Text
              style={[
                styles.kpiScoreValue,
                summary.completed > 0
                  ? isAvgGood
                    ? styles.goodScore
                    : styles.needsImprovementScore
                  : styles.neutralScore,
              ]}
            >
              {summary.completed > 0 ? summary.averageScore : '—'}
            </Text>
            {summary.completed > 0 ? (
              <Text style={styles.kpiScoreSub}>/ 100</Text>
            ) : null}
          </View>
          <Text style={styles.kpiHint}>
            {summary.completed > 0
              ? isAvgGood
                ? 'Great communication pacing'
                : 'Focus on structured answers'
              : 'No assessments evaluated'}
          </Text>
        </View>

        {/* Breakdown Stats */}
        <View style={styles.rightStatsCol}>
          <View style={styles.statMiniCard}>
            <View style={styles.statMiniHeader}>
              <Ionicons name="checkmark-done" size={14} color={COLORS.good} />
              <Text style={styles.statMiniLabel}>
                {summary.pending > 0 ? 'Completed / Pending' : 'Completed'}
              </Text>
            </View>
            <View style={styles.ratioRow}>
              <Text style={[styles.statMiniValue, { color: COLORS.good }]}>
                {summary.completed}
              </Text>
              {summary.pending > 0 ? (
                <>
                  <Text style={styles.ratioDivider}>/</Text>
                  <Text style={[styles.statMiniValue, { color: '#D97706' }]}>
                    {summary.pending}
                  </Text>
                </>
              ) : null}
            </View>
          </View>

          <View style={styles.statMiniCard}>
            <View style={styles.statMiniHeader}>
              <Ionicons name="sparkles" size={14} color={COLORS.primary} />
              <Text style={styles.statMiniLabel}>Good / Needs Imp.</Text>
            </View>
            <View style={styles.ratioRow}>
              <Text style={[styles.statMiniValue, { color: COLORS.good }]}>
                {summary.goodCount}
              </Text>
              <Text style={styles.ratioDivider}>/</Text>
              <Text
                style={[styles.statMiniValue, { color: COLORS.needsImprovement }]}
              >
                {summary.needsImprovementCount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  brandBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  brandIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoEmblem: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  brandTextGroup: {
    justifyContent: 'center',
  },
  brandNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  brandNameHighlight: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -0.3,
  },
  aiTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  aiTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.goodLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.goodBorder,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.good,
  },
  platformText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  titleSection: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 3,
    lineHeight: 18,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  kpiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  mainKpiCard: {
    flex: 1.2,
    justifyContent: 'center',
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  kpiScoreValue: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  goodScore: {
    color: '#059669',
  },
  needsImprovementScore: {
    color: '#D97706',
  },
  neutralScore: {
    color: COLORS.textMuted,
  },
  kpiScoreSub: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  kpiHint: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  rightStatsCol: {
    flex: 1,
    gap: 8,
  },
  statMiniCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statMiniHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  statMiniLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  statMiniValue: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  ratioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratioDivider: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
});
