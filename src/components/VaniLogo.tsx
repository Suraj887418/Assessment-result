import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface VaniLogoProps {
  size?: 'small' | 'medium' | 'large';
  showCoachTag?: boolean;
}

export const VaniLogo: React.FC<VaniLogoProps> = ({ size = 'medium', showCoachTag = true }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const markWidth = isLarge ? 32 : isSmall ? 20 : 26;
  const markHeight = isLarge ? 32 : isSmall ? 20 : 26;
  const textSize = isLarge ? 28 : isSmall ? 18 : 24;

  return (
    <View style={styles.container}>
      {/* Official Vani Logo Mark */}
      <View style={[styles.markWrapper, { width: markWidth, height: markHeight }]}>
        {/* Coral Orange Semicircle & V Shape */}
        <View style={styles.markBase}>
          <View style={styles.vLeftStem} />
          <View style={styles.vRightStem} />
        </View>
      </View>

      {/* Wordmark "vani" */}
      <View style={styles.wordmarkContainer}>
        <Text style={[styles.vaniText, { fontSize: textSize }]}>
          vanı
        </Text>

        {showCoachTag && (
          <View style={styles.coachPill}>
            <Text style={styles.coachText}>COACH</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  markWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markBase: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E54628', // Official Vani Coral-Red
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  vLeftStem: {
    position: 'absolute',
    top: '15%',
    left: '38%',
    width: '28%',
    height: '75%',
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '-28deg' }],
    borderRadius: 2,
  },
  vRightStem: {
    position: 'absolute',
    top: '10%',
    right: '20%',
    width: '28%',
    height: '65%',
    backgroundColor: '#E54628',
    borderRadius: 2,
  },
  wordmarkContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  vaniText: {
    fontFamily: 'System',
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1.2,
  },
  coachPill: {
    backgroundColor: '#FFF1EE',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECDD3',
    alignSelf: 'center',
  },
  coachText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#E54628',
    letterSpacing: 0.8,
  },
});
