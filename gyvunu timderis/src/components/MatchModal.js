import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TOKENS } from '../theme/tokens';
import { TRANSLATIONS } from '../data/translations';

export default function MatchModal({
  visible,
  pet,
  lang,
  onClose,
}) {
  const [copiedType, setCopiedType] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);

  if (!pet) return null;
  const t = TRANSLATIONS[lang];

  const handleCall = () => {
    Linking.openURL(`tel:${pet.shelter.phone}`);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(
      lang === 'lt'
        ? `Užklausa dėl augintinio: ${pet.name} (per „Myliu tave“)`
        : `Adoption inquiry for ${pet.name} (via "Myliu tave")`
    );
    const body = encodeURIComponent(
      lang === 'lt'
        ? `Laba diena,\n\nEsu susidomėjęs(-usi) jūsų prieglaudos augintiniu ${pet.name} (${pet.ageLt}, ${pet.city}).\nNorėčiau sužinoti daugiau informacijos ir susitarti dėl atvykimo susipažinti.\n\nPagarbiai,\n`
        : `Hello,\n\nI am interested in adopting ${pet.name} (${pet.ageEn}, ${pet.city}).\nI would love to learn more and arrange a visit to meet.\n\nBest regards,\n`
    );
    Linking.openURL(`mailto:${pet.shelter.email}?subject=${subject}&body=${body}`);
  };

  const handleCopy = (text, type) => {
    if (Platform.OS === 'web' && navigator?.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleInquirySubmit = () => {
    handleEmail();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Organic Heart & Paw Emblem */}
            <View style={styles.celebrationRow}>
              <View style={styles.heartEmblem}>
                <Ionicons name="heart" size={28} color={TOKENS.colors.textInverse} />
              </View>
              <View style={styles.sparkleBadge}>
                <Ionicons name="paw" size={16} color={TOKENS.colors.mossDark} />
              </View>
            </View>

            {/* Modal Title */}
            <Text style={styles.titleText}>{t.matchTitle}</Text>
            <Text style={styles.subtitleText}>{t.matchSubtitle}</Text>

            {/* Pet Card Preview */}
            <View style={styles.petSnippet}>
              <Image
                source={{ uri: pet.photos?.[0] }}
                style={styles.petSnippetThumb}
              />
              <View style={styles.petSnippetInfo}>
                <Text style={styles.petSnippetName}>{pet.name}</Text>
                <Text style={styles.petSnippetMeta}>
                  {lang === 'lt' ? pet.ageLt : pet.ageEn} · {pet.city}
                </Text>
                <View style={styles.shelterMiniTag}>
                  <Ionicons name="shield-checkmark" size={12} color={TOKENS.colors.mossDark} />
                  <Text style={styles.shelterMiniTagText}>{pet.shelter.name}</Text>
                </View>
              </View>
            </View>

            {/* Shelter Contact Section */}
            <View style={styles.shelterCard}>
              <View style={styles.shelterHeader}>
                <Ionicons name="business" size={18} color={TOKENS.colors.clayDark} />
                <Text style={styles.shelterCardTitle}>{t.shelterHeading}</Text>
              </View>

              {/* Shelter Name & Address */}
              <View style={styles.infoLine}>
                <Text style={styles.infoLabel}>{t.address}:</Text>
                <Text style={styles.infoValue}>{pet.shelter.address}</Text>
              </View>

              <View style={styles.infoLine}>
                <Text style={styles.infoLabel}>{t.shelterCode}:</Text>
                <Text style={styles.infoValue}>{pet.shelter.regCode}</Text>
              </View>

              {/* Phone Row */}
              <View style={styles.contactItem}>
                <View style={styles.contactIconWrap}>
                  <Ionicons name="call" size={18} color={TOKENS.colors.terracottaDark} />
                </View>
                <View style={styles.contactTexts}>
                  <Text style={styles.contactLabel}>{t.phone}</Text>
                  <Text style={styles.contactNumber}>{pet.shelter.phone}</Text>
                </View>
                <View style={styles.contactButtonsRow}>
                  <TouchableOpacity
                    style={styles.actionIconBtn}
                    onPress={() => handleCopy(pet.shelter.phone, 'phone')}
                    activeOpacity={0.7}
                    accessibilityLabel="Copy phone"
                  >
                    <Ionicons
                      name={copiedType === 'phone' ? 'checkmark' : 'copy-outline'}
                      size={16}
                      color={copiedType === 'phone' ? TOKENS.colors.mossDark : TOKENS.colors.textSecondary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.callNowBtn}
                    onPress={handleCall}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="call" size={14} color={TOKENS.colors.textInverse} />
                    <Text style={styles.callNowText}>{t.callNow}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Email Row */}
              <View style={styles.contactItem}>
                <View style={styles.contactIconWrap}>
                  <Ionicons name="mail" size={18} color={TOKENS.colors.sageDark} />
                </View>
                <View style={styles.contactTexts}>
                  <Text style={styles.contactLabel}>{t.email}</Text>
                  <Text style={styles.contactNumber} numberOfLines={1}>
                    {pet.shelter.email}
                  </Text>
                </View>
                <View style={styles.contactButtonsRow}>
                  <TouchableOpacity
                    style={styles.actionIconBtn}
                    onPress={() => handleCopy(pet.shelter.email, 'email')}
                    activeOpacity={0.7}
                    accessibilityLabel="Copy email"
                  >
                    <Ionicons
                      name={copiedType === 'email' ? 'checkmark' : 'copy-outline'}
                      size={16}
                      color={copiedType === 'email' ? TOKENS.colors.mossDark : TOKENS.colors.textSecondary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.emailNowBtn}
                    onPress={handleEmail}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="mail" size={14} color={TOKENS.colors.textInverse} />
                    <Text style={styles.emailNowText}>{t.emailNow}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Copy Notification Toast */}
            {copiedType && (
              <View style={styles.copyToast}>
                <Ionicons name="checkmark-circle" size={16} color={TOKENS.colors.mossDark} />
                <Text style={styles.copyToastText}>{t.copiedAlert}</Text>
              </View>
            )}

            {/* Direct Inquiry Action Button */}
            <TouchableOpacity
              style={styles.inquiryBtn}
              onPress={handleInquirySubmit}
              activeOpacity={0.8}
            >
              <Ionicons name="paper-plane" size={18} color={TOKENS.colors.textInverse} />
              <Text style={styles.inquiryBtnText}>{t.openInquiryForm}</Text>
            </TouchableOpacity>

            {/* Continue Browsing Button */}
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.continueBtnText}>{t.continueBrowsing}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(43, 35, 29, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    maxHeight: '90%',
    backgroundColor: TOKENS.colors.cardSurface,
    borderRadius: TOKENS.radii.modal,
    borderWidth: 2,
    borderColor: TOKENS.colors.cardBorder,
    overflow: 'hidden',
    ...TOKENS.shadows.card,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  celebrationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  heartEmblem: {
    width: 64,
    height: 64,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    ...TOKENS.shadows.button,
  },
  sparkleBadge: {
    position: 'absolute',
    right: -10,
    top: -4,
    width: 32,
    height: 32,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.mossBg,
    borderWidth: 2,
    borderColor: TOKENS.colors.cardSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    fontFamily: TOKENS.typography.title.fontFamily,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 13,
    color: TOKENS.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  petSnippet: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: TOKENS.colors.sand,
    borderRadius: TOKENS.radii.lg,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  petSnippetThumb: {
    width: 60,
    height: 60,
    borderRadius: TOKENS.radii.md,
    backgroundColor: TOKENS.colors.sandDeep,
  },
  petSnippetInfo: {
    marginLeft: 12,
    flex: 1,
  },
  petSnippetName: {
    fontSize: 18,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
    fontFamily: TOKENS.typography.title.fontFamily,
  },
  petSnippetMeta: {
    fontSize: 12,
    color: TOKENS.colors.textSecondary,
    marginTop: 1,
  },
  shelterMiniTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  shelterMiniTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.mossDark,
  },
  shelterCard: {
    width: '100%',
    backgroundColor: TOKENS.colors.sand,
    borderRadius: TOKENS.radii.lg,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  shelterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: TOKENS.colors.sandDeep,
  },
  shelterCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
  },
  infoLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 11,
    color: TOKENS.colors.textMuted,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 11,
    color: TOKENS.colors.textSecondary,
    fontWeight: '600',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TOKENS.colors.cardSurface,
    borderRadius: TOKENS.radii.md,
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: TOKENS.colors.cardBorder,
  },
  contactIconWrap: {
    width: 34,
    height: 34,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.sand,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  contactTexts: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: TOKENS.colors.textMuted,
    textTransform: 'uppercase',
  },
  contactNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
  },
  contactButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIconBtn: {
    padding: 6,
    backgroundColor: TOKENS.colors.sand,
    borderRadius: TOKENS.radii.pill,
  },
  callNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.terracotta,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: TOKENS.radii.pill,
  },
  callNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
  },
  emailNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.sage,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: TOKENS.radii.pill,
  },
  emailNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
  },
  copyToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: TOKENS.colors.mossBg,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: TOKENS.radii.pill,
    marginBottom: 12,
  },
  copyToastText: {
    fontSize: 12,
    fontWeight: '600',
    color: TOKENS.colors.mossDark,
  },
  inquiryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: TOKENS.colors.terracotta,
    paddingVertical: 14,
    borderRadius: TOKENS.radii.pill,
    marginBottom: 10,
    ...TOKENS.shadows.button,
  },
  inquiryBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
  },
  continueBtn: {
    paddingVertical: 8,
  },
  continueBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: TOKENS.colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
