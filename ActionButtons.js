import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TOKENS } from '../theme/tokens';

export default function ActionButtons({
  onRewind,
  onPass,
  onInfo,
  onLike,
  canRewind,
}) {
  // Breathing animation on the hero like button (Organic aesthetic differentiator)
  const breathingScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathingScale, {
          toValue: 1.07,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(breathingScale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [breathingScale]);

  return (
    <View style={styles.container}>
      {/* Rewind Button */}
      <TouchableOpacity
        style={[
          styles.actionBtn,
          styles.rewindBtn,
          !canRewind && styles.btnDisabled,
        ]}
        onPress={onRewind}
        disabled={!canRewind}
        activeOpacity={0.7}
        accessibilityLabel="Rewind"
      >
        <Ionicons
          name="arrow-undo"
          size={20}
          color={canRewind ? TOKENS.colors.ochreDark : TOKENS.colors.sandDeep}
        />
      </TouchableOpacity>

      {/* Pass Button */}
      <TouchableOpacity
        style={[styles.actionBtn, styles.passBtn]}
        onPress={onPass}
        activeOpacity={0.75}
        accessibilityLabel="Pass"
      >
        <Ionicons name="close" size={28} color={TOKENS.colors.clayDark} />
      </TouchableOpacity>

      {/* Info / Story Button */}
      <TouchableOpacity
        style={[styles.actionBtn, styles.infoBtn]}
        onPress={onInfo}
        activeOpacity={0.75}
        accessibilityLabel="Info"
      >
        <Ionicons name="information" size={24} color={TOKENS.colors.sageDark} />
      </TouchableOpacity>

      {/* Like / Myliu Button with Breathing Pulse */}
      <Animated.View style={{ transform: [{ scale: breathingScale }] }}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.likeBtn]}
          onPress={onLike}
          activeOpacity={0.8}
          accessibilityLabel="Like"
        >
          <Ionicons name="heart" size={32} color={TOKENS.colors.textInverse} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TOKENS.radii.pill,
    ...TOKENS.shadows.button,
  },
  rewindBtn: {
    width: 46,
    height: 46,
    backgroundColor: TOKENS.colors.oat,
    borderWidth: 1.5,
    borderColor: TOKENS.colors.sandDeep,
  },
  passBtn: {
    width: 58,
    height: 58,
    backgroundColor: TOKENS.colors.clayBg,
    borderWidth: 2,
    borderColor: TOKENS.colors.clay,
  },
  infoBtn: {
    width: 50,
    height: 50,
    backgroundColor: TOKENS.colors.sageBg,
    borderWidth: 1.5,
    borderColor: TOKENS.colors.sage,
  },
  likeBtn: {
    width: 64,
    height: 64,
    backgroundColor: TOKENS.colors.terracotta,
    borderWidth: 2,
    borderColor: TOKENS.colors.terracottaLight,
    ...TOKENS.shadows.card,
  },
  btnDisabled: {
    opacity: 0.45,
    borderColor: TOKENS.colors.sandDeep,
  },
});
