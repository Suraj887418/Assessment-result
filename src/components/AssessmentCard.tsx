import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssessmentItem } from '../types/assessment';
import { COLORS, SCORE_THRESHOLD } from '../constants/theme';
import { TypeBadge } from './TypeBadge';
import { PerformanceBadge } from './PerformanceBadge';

interface AssessmentCardProps {
  item: AssessmentItem;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = React.memo(({ item }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const isCompleted = item.status === 'completed';
  const hasScore = item.score !== undefined;
  const isGood = hasScore && (item.score ?? 0) >= SCORE_THRESHOLD;
  const isRecorded = item.type === 'recorded';

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const toggleAudio = useCallback(() => {
    setIsPlayingAudio((prev) => !prev);
  }, []);

  return (
    <View style={[styles.card, !isCompleted && styles.pendingCard]}>
      {/* Top Meta Bar: Category, Date & Status */}
      <View style={styles.topRow}>
        <View style={styles.typeGroup}>
          <TypeBadge type={item.type} durationOrWords={item.durationOrWords} />
          {item.category ? (
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          ) : null}
          {!isCompleted ? (
            <View style={styles.pendingTopBadge}>
              <View style={styles.pendingPulseDot} />
              <Text style={styles.pendingTopBadgeText}>Pending Evaluation</Text>
            </View>
          ) : null}
        </View>

        {item.date ? <Text style={styles.dateText}>{item.date}</Text> : null}
      </View>

      {/* Main Content: Question and Score */}
      <View style={styles.mainRow}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>Question</Text>
          <Text style={styles.questionText}>{item.question}</Text>
        </View>

        {/* Score / Pending Badge */}
        {hasScore ? (
          <View
            style={[
              styles.scoreBox,
              isGood ? styles.goodScoreBox : styles.improvementScoreBox,
            ]}
          >
            <Text
              style={[
                styles.scoreNumber,
                isGood ? styles.goodScoreText : styles.improvementScoreText,
              ]}
            >
              {item.score}
            </Text>
            <Text style={styles.scoreMax}>/ 100</Text>
          </View>
        ) : (
          <View style={[styles.scoreBox, styles.pendingScoreBox]}>
            <Ionicons name="hourglass-outline" size={16} color="#D97706" />
            <Text style={styles.pendingScoreNumber}>Pending</Text>
            <Text style={styles.pendingScoreMax}>In Review</Text>
          </View>
        )}
      </View>

      {/* Interactive Media Preview Section (Audio Player / Text Preview) */}
      <View style={styles.mediaPreviewContainer}>
        {isRecorded ? (
          <View style={styles.audioPlayerBox}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={toggleAudio}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={isPlayingAudio ? 'Pause recording' : 'Play recording'}
            >
              <Ionicons
                name={isPlayingAudio ? 'pause' : 'play'}
                size={16}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <View style={styles.audioTrackWrapper}>
              <View style={styles.audioWaveform}>
                {[35, 65, 90, 45, 80, 100, 70, 50, 85, 40, 95, 60, 30, 75, 40].map(
                  (height, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.waveBar,
                        { height: `${height}%` },
                        isPlayingAudio && idx < 8 ? styles.waveBarActive : null,
                      ]}
                    />
                  )
                )}
              </View>
              <View style={styles.audioMetaRow}>
                <Text style={styles.audioStatusText}>
                  {isPlayingAudio
                    ? 'Playing candidate audio...'
                    : isCompleted
                    ? 'Recorded Response'
                    : 'Candidate Audio (Pending AI Score)'}
                </Text>
                <Text style={styles.audioDurationText}>
                  {item.durationOrWords || '1:45'}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.textSubmissionBox}>
            <Ionicons name="document-text-outline" size={15} color={COLORS.textBadgeText} />
            <Text style={styles.textSubmissionLabel}>
              {isCompleted ? 'Text Submission Evaluated' : 'Text Submission (Pending AI Score)'}
            </Text>
            <Text style={styles.textWordCount}>({item.durationOrWords || '180 words'})</Text>
          </View>
        )}
      </View>

      {/* Status & Performance Indicator */}
      <View style={styles.performanceRow}>
        <PerformanceBadge score={item.score} status={item.status} />

        {isCompleted && item.feedback ? (
          <TouchableOpacity
            style={styles.expandToggle}
            onPress={toggleExpand}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={isExpanded ? 'Collapse feedback' : 'Expand feedback'}
          >
            <Text style={styles.expandText}>
              {isExpanded ? 'Hide AI Feedback' : 'View AI Feedback'}
            </Text>
            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={15}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* AI-Generated Feedback Section */}
      {isCompleted && item.feedback && isExpanded ? (
        <View style={styles.feedbackContainer}>
          <View style={styles.feedbackHeader}>
            <View style={styles.aiTag}>
              <Ionicons name="sparkles" size={13} color={COLORS.primary} />
              <Text style={styles.aiTagText}>Personalized AI Coaching Insights</Text>
            </View>
            <Text style={styles.verifiedTag}>Automated Analysis</Text>
          </View>
          <Text style={styles.feedbackContent}>{item.feedback}</Text>
        </View>
      ) : null}

      {/* Pending State View */}
      {!isCompleted ? (
        <View style={styles.pendingNotice}>
          <Ionicons name="hourglass-outline" size={18} color="#D97706" />
          <View style={styles.pendingNoticeContent}>
            <Text style={styles.pendingNoticeTitle}>Evaluation in Progress</Text>
            <Text style={styles.pendingNoticeText}>
              AI Coach is analyzing response structure, pacing, and delivery metrics.
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  pendingCard: {
    borderColor: '#FDE68A',
    backgroundColor: '#FFFEFA',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  typeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
  },
  pendingTopBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pendingPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D97706',
  },
  pendingTopBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14,
    marginBottom: 14,
  },
  questionContainer: {
    flex: 1,
  },
  questionLabel: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: '#94A3B8',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  scoreBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    minWidth: 68,
  },
  goodScoreBox: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  improvementScoreBox: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  pendingScoreBox: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  pendingScoreNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#B45309',
    marginTop: 2,
  },
  pendingScoreMax: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400E',
  },
  goodScoreText: {
    color: '#059669',
  },
  improvementScoreText: {
    color: '#D97706',
  },
  scoreMax: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  mediaPreviewContainer: {
    marginBottom: 12,
  },
  audioPlayerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  audioTrackWrapper: {
    flex: 1,
    gap: 4,
  },
  audioWaveform: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
    gap: 3,
  },
  waveBar: {
    flex: 1,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    minHeight: 4,
  },
  waveBarActive: {
    backgroundColor: COLORS.primary,
  },
  audioMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  audioDurationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  textSubmissionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    gap: 6,
  },
  textSubmissionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B21A8',
  },
  textWordCount: {
    fontSize: 11,
    color: '#9333EA',
    fontWeight: '500',
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  expandToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.primaryLight,
  },
  expandText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  feedbackContainer: {
    marginTop: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  aiTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  verifiedTag: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  feedbackContent: {
    fontSize: 13.5,
    color: '#334155',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  pendingNotice: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pendingNoticeContent: {
    flex: 1,
  },
  pendingNoticeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 2,
  },
  pendingNoticeText: {
    fontSize: 12,
    color: '#B45309',
    lineHeight: 17,
  },
});
