import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TOKENS } from '../theme/tokens';
import { TRANSLATIONS } from '../data/translations';

export default function PetCard({ pet, lang, onOpenDetails }) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const t = TRANSLATIONS[lang];

  const tags = lang === 'lt' ? pet.compatibilityTagsLt : pet.compatibilityTagsEn;
  const age = lang === 'lt' ? pet.ageLt : pet.ageEn;
  const bio = lang === 'lt' ? pet.bioLt : pet.bioEn;
  const photos = pet.photos || [];

  const isLongTerm = pet.waitingDays >= 180;

  const handleNextPhoto = (e) => {
    e?.stopPropagation?.();
    if (photos.length > 1) {
      setActivePhotoIdx((prev) => (prev + 1) % photos.length);
    }
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation?.();
    if (photos.length > 1) {
      setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Pet Image with gradient vignette & gallery click zones */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: photos[activePhotoIdx] || photos[0] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Multi-photo indicator dots */}
        {photos.length > 1 && (
          <View style={styles.photoDotsRow}>
            {photos.map((_, idx) => (
              <View
                key={idx}
                style={[
                  styles.photoDot,
                  idx === activePhotoIdx && styles.photoDotActive,
                ]}
              />
            ))}
          </View>
        )}

        {/* Left/Right tap zones for photo flipping */}
        <TouchableOpacity
          style={styles.tapZoneLeft}
          onPress={handlePrevPhoto}
          activeOpacity={0.9}
        />
        <TouchableOpacity
          style={styles.tapZoneRight}
          onPress={handleNextPhoto}
          activeOpacity={0.9}
        />

        {/* Top Badges Row */}
        <View style={styles.topBadgesRow}>
          {/* Verified Shelter Badge */}
          <View style={styles.shelterBadge}>
            <Ionicons name="shield-checkmark" size={12} color={TOKENS.colors.textInverse} />
            <Text style={styles.shelterBadgeText} numberOfLines={1}>
              {pet.shelter.name}
            </Text>
          </View>

          {/* City Pill */}
          <View style={styles.cityPill}>
            <Ionicons name="location-sharp" size={12} color={TOKENS.colors.textInverse} />
            <Text style={styles.cityPillText}>{pet.city}</Text>
          </View>
        </View>

        {/* "Laukia X d." Waiting-time pill badge (Terracotta highlight for 180+ days) */}
        <View style={styles.waitingBadgeWrapper}>
          <View
            style={[
              styles.waitingPill,
              isLongTerm ? styles.waitingPillUrgent : styles.waitingPillNormal,
            ]}
          >
            <Ionicons
              name={isLongTerm ? 'flame' : 'time-outline'}
              size={13}
              color={isLongTerm ? TOKENS.colors.textInverse : TOKENS.colors.textSecondary}
            />
            <Text
              style={[
                styles.waitingText,
                isLongTerm ? styles.waitingTextUrgent : styles.waitingTextNormal,
              ]}
            >
              {t.waitingPrefix} {pet.waitingDays} {t.daysShort}
              {isLongTerm ? ` · ${t.urgentBadgeLabel}` : ''}
            </Text>
          </View>
        </View>

        {/* Gradient shadow to transition image smoothly to content */}
        <LinearGradient
          colors={['transparent', 'rgba(43, 35, 29, 0.45)', 'rgba(43, 35, 29, 0.9)']}
          style={styles.gradientOverlay}
        />

        {/* Pet Name & Age over lower portion of the image */}
        <View style={styles.heroInfoOverlay}>
          <View style={styles.nameRow}>
            <Text style={styles.petName}>{pet.name}</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeText}>{age}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Card Content Body: Medical Readiness, Tags, Lithuanian Bio */}
      <View style={styles.contentBody}>
        {/* Clean Medical Readiness Icons: Čipuotas, Skiepytas, Sterilizuotas */}
        <View style={styles.medicalRow}>
          {/* Čipuotas */}
          <View
            style={[
              styles.medicalBadge,
              pet.medical?.chipped ? styles.medicalBadgeActive : styles.medicalBadgeInactive,
            ]}
          >
            <Ionicons
              name="hardware-chip-outline"
              size={13}
              color={pet.medical?.chipped ? TOKENS.colors.mossDark : TOKENS.colors.textMuted}
            />
            <Text
              style={[
                styles.medicalText,
                pet.medical?.chipped ? styles.medicalTextActive : styles.medicalTextInactive,
              ]}
            >
              {t.chipped}
            </Text>
          </View>

          {/* Skiepytas */}
          <View
            style={[
              styles.medicalBadge,
              pet.medical?.vaccinated ? styles.medicalBadgeActive : styles.medicalBadgeInactive,
            ]}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={13}
              color={pet.medical?.vaccinated ? TOKENS.colors.mossDark : TOKENS.colors.textMuted}
            />
            <Text
              style={[
                styles.medicalText,
                pet.medical?.vaccinated ? styles.medicalTextActive : styles.medicalTextInactive,
              ]}
            >
              {t.vaccinated}
            </Text>
          </View>

          {/* Sterilizuotas */}
          <View
            style={[
              styles.medicalBadge,
              pet.medical?.neutered ? styles.medicalBadgeActive : styles.medicalBadgeInactive,
            ]}
          >
            <Ionicons
              name={pet.medical?.neutered ? 'checkmark-circle-outline' : 'ellipse-outline'}
              size={13}
              color={pet.medical?.neutered ? TOKENS.colors.mossDark : TOKENS.colors.textMuted}
            />
            <Text
              style={[
                styles.medicalText,
                pet.medical?.neutered ? styles.medicalTextActive : styles.medicalTextInactive,
              ]}
            >
              {pet.medical?.neutered ? t.neutered : t.notNeutered}
            </Text>
          </View>
        </View>

        {/* Compatibility Tags */}
        <View style={styles.tagsContainer}>
          {tags.slice(0, 3).map((tag, idx) => (
            <View key={idx} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Short Bio */}
        <Text style={styles.bioText} numberOfLines={2}>
          {bio}
        </Text>

        {/* Shelter footer link button */}
        <TouchableOpacity
          style={styles.detailsRow}
          onPress={onOpenDetails}
          activeOpacity={0.7}
        >
          <View style={styles.shelterAddressRow}>
            <Ionicons name="home-outline" size={13} color={TOKENS.colors.clayDark} />
            <Text style={styles.shelterAddressText} numberOfLines={1}>
              {pet.shelter.address}
            </Text>
          </View>
          <View style={styles.moreInfoBtn}>
            <Text style={styles.moreInfoText}>{t.btnInfo}</Text>
            <Ionicons name="chevron-forward" size={13} color={TOKENS.colors.sageDark} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: TOKENS.colors.cardSurface,
    borderRadius: TOKENS.radii.xl,
    borderWidth: 1.5,
    borderColor: TOKENS.colors.cardBorder,
    overflow: 'hidden',
    ...TOKENS.shadows.card,
  },
  imageWrapper: {
    height: '60%',
    position: 'relative',
    backgroundColor: TOKENS.colors.sandDeep,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  photoDotsRow: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    zIndex: 10,
  },
  photoDot: {
    height: 4,
    flex: 1,
    maxWidth: 44,
    borderRadius: 2,
    backgroundColor: 'rgba(232, 220, 199, 0.45)',
  },
  photoDotActive: {
    backgroundColor: TOKENS.colors.textInverse,
  },
  tapZoneLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '40%',
    zIndex: 5,
  },
  tapZoneRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '40%',
    zIndex: 5,
  },
  topBadgesRow: {
    position: 'absolute',
    top: 22,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  shelterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: TOKENS.colors.moss,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: TOKENS.radii.pill,
    maxWidth: '65%',
    ...TOKENS.shadows.button,
  },
  shelterBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
    letterSpacing: 0.1,
  },
  cityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.ochreDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: TOKENS.radii.pill,
    ...TOKENS.shadows.button,
  },
  cityPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
  },
  waitingBadgeWrapper: {
    position: 'absolute',
    top: 56,
    left: 14,
    zIndex: 10,
  },
  waitingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
  },
  waitingPillUrgent: {
    backgroundColor: TOKENS.colors.terracotta,
    borderColor: TOKENS.colors.terracottaLight,
    ...TOKENS.shadows.button,
  },
  waitingPillNormal: {
    backgroundColor: 'rgba(232, 220, 199, 0.92)',
    borderColor: TOKENS.colors.sandDeep,
  },
  waitingText: {
    fontSize: 11,
    fontWeight: '700',
  },
  waitingTextUrgent: {
    color: TOKENS.colors.textInverse,
    letterSpacing: 0.2,
  },
  waitingTextNormal: {
    color: TOKENS.colors.textPrimary,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
    zIndex: 6,
  },
  heroInfoOverlay: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    zIndex: 7,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  petName: {
    fontSize: 30,
    fontFamily: TOKENS.typography.display.fontFamily,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(43, 35, 29, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ageBadge: {
    backgroundColor: 'rgba(232, 220, 199, 0.35)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(250, 245, 238, 0.4)',
  },
  ageBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: TOKENS.colors.textInverse,
  },
  contentBody: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    justifyContent: 'space-between',
    backgroundColor: TOKENS.colors.cardSurface,
  },
  medicalRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  medicalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
  },
  medicalBadgeActive: {
    backgroundColor: TOKENS.colors.mossBg,
    borderColor: TOKENS.colors.sageLight,
  },
  medicalBadgeInactive: {
    backgroundColor: TOKENS.colors.sandDeep,
    borderColor: TOKENS.colors.sandDeep,
    opacity: 0.65,
  },
  medicalText: {
    fontSize: 10,
    fontWeight: '700',
  },
  medicalTextActive: {
    color: TOKENS.colors.mossDark,
  },
  medicalTextInactive: {
    color: TOKENS.colors.textMuted,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  tagPill: {
    backgroundColor: TOKENS.colors.sandDeep,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.cardBorder,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: TOKENS.colors.textSecondary,
  },
  bioText: {
    fontSize: 12,
    lineHeight: 17,
    color: TOKENS.colors.textSecondary,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: TOKENS.colors.sandDeep,
  },
  shelterAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    marginRight: 8,
  },
  shelterAddressText: {
    fontSize: 11,
    color: TOKENS.colors.textMuted,
    fontWeight: '500',
  },
  moreInfoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: TOKENS.colors.sageBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: TOKENS.radii.pill,
  },
  moreInfoText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.sageDark,
  },
});
