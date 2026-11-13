import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PetCard from './PetCard';
import { TOKENS } from '../theme/tokens';
import { TRANSLATIONS } from '../data/translations';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.28;

export default function CardStack({
  pets,
  lang,
  onSwipeRight,
  onSwipeLeft,
  onOpenDetails,
  onResetStack,
  onOpenLikes,
  likedCount,
  stackRef,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const t = TRANSLATIONS[lang];

  // Expose programmatic trigger functions via stackRef
  useEffect(() => {
    if (stackRef) {
      stackRef.current = {
        swipeRight: () => triggerSwipe('right'),
        swipeLeft: () => triggerSwipe('left'),
        rewind: () => {
          if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            position.setValue({ x: 0, y: 0 });
          }
        },
      };
    }
  }, [currentIndex, pets]);

  // Reset index if filter changes and pets list changes
  useEffect(() => {
    setCurrentIndex(0);
    position.setValue({ x: 0, y: 0 });
  }, [pets]);

  const triggerSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    const currentPet = pets[currentIndex];
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 320,
      useNativeDriver: true,
    }).start(() => {
      onSwipeComplete(direction, currentPet);
    });
  };

  const onSwipeComplete = (direction, swipedPet) => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => prev + 1);
    if (direction === 'right') {
      onSwipeRight(swipedPet);
    } else {
      onSwipeLeft(swipedPet);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          triggerSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          triggerSwipe('left');
        } else {
          // Snap back to center with smooth organic spring
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Rotation linked to horizontal swipe
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  // Stamp opacities
  const likeOpacity = position.x.interpolate({
    inputRange: [15, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, -15],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Next card scale and position animation underneath
  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.94, 1],
    extrapolate: 'clamp',
  });

  const nextCardTranslateY = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 14, 0],
    extrapolate: 'clamp',
  });

  // If all cards in this filter were swiped
  if (currentIndex >= pets.length) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="sparkles" size={36} color={TOKENS.colors.terracotta} />
          </View>
          <Text style={styles.emptyTitle}>{t.stackEmptyTitle}</Text>
          <Text style={styles.emptyDesc}>{t.stackEmptyDesc}</Text>

          <View style={styles.emptyActions}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setCurrentIndex(0);
                onResetStack?.();
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={18} color={TOKENS.colors.textInverse} />
              <Text style={styles.resetButtonText}>{t.stackReset}</Text>
            </TouchableOpacity>

            {likedCount > 0 && (
              <TouchableOpacity
                style={styles.viewLikesButton}
                onPress={onOpenLikes}
                activeOpacity={0.8}
              >
                <Ionicons name="heart" size={18} color={TOKENS.colors.clayDark} />
                <Text style={styles.viewLikesButtonText}>
                  {t.stackViewLikes} ({likedCount})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  const currentPet = pets[currentIndex];
  const nextPet = pets[currentIndex + 1];

  return (
    <View style={styles.stackWrapper}>
      {/* Next card in the stack (underneath) */}
      {nextPet && (
        <Animated.View
          style={[
            styles.cardSlot,
            {
              transform: [
                { scale: nextCardScale },
                { translateY: nextCardTranslateY },
              ],
              zIndex: 1,
            },
          ]}
        >
          <PetCard pet={nextPet} lang={lang} onOpenDetails={() => {}} />
        </Animated.View>
      )}

      {/* Top interactive swipeable card */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.cardSlot,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate },
            ],
            zIndex: 10,
          },
        ]}
      >
        <PetCard
          pet={currentPet}
          lang={lang}
          onOpenDetails={() => onOpenDetails(currentPet)}
        />

        {/* Visual stamp on dragging right: "MYLIU" (Organic Terracotta) */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.stampBadge,
            styles.likeStamp,
            { opacity: likeOpacity },
          ]}
        >
          <Ionicons name="heart" size={20} color={TOKENS.colors.terracottaDark} style={{ marginRight: 6 }} />
          <Text style={styles.likeStampText}>{t.likeStamp}</Text>
        </Animated.View>

        {/* Visual stamp on dragging left: "PRALEISTI" (Organic Clay) */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.stampBadge,
            styles.passStamp,
            { opacity: passOpacity },
          ]}
        >
          <Ionicons name="close" size={22} color={TOKENS.colors.clayDark} style={{ marginRight: 4 }} />
          <Text style={styles.passStampText}>{t.passStamp}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stackWrapper: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  cardSlot: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxWidth: 420,
    maxHeight: 560,
  },
  stampBadge: {
    position: 'absolute',
    top: 36,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: TOKENS.radii.md,
    borderWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99,
    ...TOKENS.shadows.organic,
  },
  likeStamp: {
    left: 24,
    borderColor: TOKENS.colors.terracotta,
    backgroundColor: TOKENS.colors.terracottaBg,
    transform: [{ rotate: '-14deg' }],
  },
  likeStampText: {
    fontSize: 22,
    fontWeight: '900',
    color: TOKENS.colors.terracottaDark,
    letterSpacing: 1.5,
  },
  passStamp: {
    right: 24,
    borderColor: TOKENS.colors.clay,
    backgroundColor: TOKENS.colors.clayBg,
    transform: [{ rotate: '14deg' }],
  },
  passStampText: {
    fontSize: 20,
    fontWeight: '900',
    color: TOKENS.colors.clayDark,
    letterSpacing: 1.5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: TOKENS.colors.cardSurface,
    borderRadius: TOKENS.radii.xl,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: TOKENS.colors.cardBorder,
    ...TOKENS.shadows.card,
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.terracottaBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: TOKENS.typography.title.fontFamily,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    lineHeight: 21,
    color: TOKENS.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyActions: {
    width: '100%',
    gap: 12,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: TOKENS.colors.sage,
    paddingVertical: 14,
    borderRadius: TOKENS.radii.pill,
    ...TOKENS.shadows.button,
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
  },
  viewLikesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: TOKENS.colors.oat,
    paddingVertical: 14,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  viewLikesButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
  },
});
