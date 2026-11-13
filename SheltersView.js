import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SHELTERS } from '../data/shelters';
import { TOKENS } from '../theme/tokens';
import { TRANSLATIONS } from '../data/translations';

export default function SheltersView({
  lang,
  onSelectShelterPets,
}) {
  const [selectedCity, setSelectedCity] = useState('all');
  const t = TRANSLATIONS[lang];

  const filteredShelters = selectedCity === 'all'
    ? SHELTERS
    : SHELTERS.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email, shelterName) => {
    const subject = encodeURIComponent(
      lang === 'lt'
        ? `Užklausa dėl gyvūnų globos („Myliu tave“)`
        : `Inquiry regarding animal adoption ("Myliu tave")`
    );
    Linking.openURL(`mailto:${email}?subject=${subject}`);
  };

  const handleWebsite = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Overview Stats Header */}
      <View style={styles.headerStatsCard}>
        <View style={styles.statsIconWrap}>
          <Ionicons name="home" size={20} color={TOKENS.colors.textInverse} />
        </View>
        <View style={styles.statsTextWrap}>
          <Text style={styles.statsTitle}>{t.sheltersHeaderTitle}</Text>
          <Text style={styles.statsSubtitle}>
            8 {t.shelterAnimalsCount} · 1073 {lang === 'lt' ? 'išgelbėti keturkojai' : 'rescued animals'}
          </Text>
        </View>
      </View>

      {/* Shelter List */}
      <FlatList
        data={filteredShelters}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const desc = lang === 'lt' ? item.descriptionLt : item.descriptionEn;

          return (
            <View style={styles.shelterCard}>
              {/* Top Row: Name and City */}
              <View style={styles.shelterTop}>
                <View style={styles.nameBlock}>
                  <Text style={styles.shelterName}>{item.name}</Text>
                  <View style={styles.addressLine}>
                    <Ionicons name="location-outline" size={13} color={TOKENS.colors.clayDark} />
                    <Text style={styles.addressText}>{item.address}</Text>
                  </View>
                </View>

                <View style={styles.cityPill}>
                  <Text style={styles.cityPillText}>{item.city}</Text>
                </View>
              </View>

              {/* Animal Counts Pills: Dogs, Cats, Total */}
              <View style={styles.countsRow}>
                <View style={styles.countBadgeDog}>
                  <Ionicons name="paw" size={13} color={TOKENS.colors.ochreDark} />
                  <Text style={styles.countBadgeDogText}>
                    {item.dogsCount} {t.dogsCountLabel}
                  </Text>
                </View>

                <View style={styles.countBadgeCat}>
                  <Ionicons name="sparkles" size={13} color={TOKENS.colors.sageDark} />
                  <Text style={styles.countBadgeCatText}>
                    {item.catsCount} {t.catsCountLabel}
                  </Text>
                </View>

                <View style={styles.totalBadge}>
                  <Text style={styles.totalBadgeText}>
                    {item.totalCount} {lang === 'lt' ? 'iš viso' : 'total'}
                  </Text>
                </View>
              </View>

              {/* Short Shelter Story */}
              <Text style={styles.descText} numberOfLines={2}>
                {desc}
              </Text>

              {/* Action Buttons: Call, Email, Website, Show Pets */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionBtnCall}
                  onPress={() => handleCall(item.phone)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="call" size={13} color={TOKENS.colors.textInverse} />
                  <Text style={styles.actionBtnCallText}>{t.callShelter}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnEmail}
                  onPress={() => handleEmail(item.email, item.name)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="mail" size={13} color={TOKENS.colors.textPrimary} />
                  <Text style={styles.actionBtnEmailText}>{t.emailShelter}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnWeb}
                  onPress={() => handleWebsite(item.website)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="globe-outline" size={13} color={TOKENS.colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnPets}
                  onPress={() => onSelectShelterPets?.(item.city)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.actionBtnPetsText}>{t.filterByThisShelter}</Text>
                  <Ionicons name="chevron-forward" size={12} color={TOKENS.colors.terracottaDark} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  headerStatsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TOKENS.colors.cardSurface,
    borderRadius: TOKENS.radii.lg,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: TOKENS.colors.cardBorder,
    ...TOKENS.shadows.button,
  },
  statsIconWrap: {
    width: 38,
    height: 38,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.moss,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statsTextWrap: {
    flex: 1,
  },
  statsTitle: {
    fontSize: 15,
    fontFamily: TOKENS.typography.title.fontFamily,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
  },
  statsSubtitle: {
    fontSize: 11,
    color: TOKENS.colors.textSecondary,
    marginTop: 1,
  },
  listContent: {
    paddingBottom: 20,
    gap: 12,
  },
  shelterCard: {
    backgroundColor: TOKENS.colors.cardSurface,
    borderRadius: TOKENS.radii.xl,
    padding: 14,
    borderWidth: 1.5,
    borderColor: TOKENS.colors.cardBorder,
    ...TOKENS.shadows.card,
  },
  shelterTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nameBlock: {
    flex: 1,
    marginRight: 10,
  },
  shelterName: {
    fontSize: 16,
    fontFamily: TOKENS.typography.title.fontFamily,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
  },
  addressLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  addressText: {
    fontSize: 11,
    color: TOKENS.colors.textMuted,
  },
  cityPill: {
    backgroundColor: TOKENS.colors.ochreBg,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.ochreLight,
  },
  cityPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.ochreDark,
  },
  countsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  countBadgeDog: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.sandDeep,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: TOKENS.radii.pill,
  },
  countBadgeDogText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.ochreDark,
  },
  countBadgeCat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.sageBg,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: TOKENS.radii.pill,
  },
  countBadgeCatText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.sageDark,
  },
  totalBadge: {
    backgroundColor: TOKENS.colors.oat,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: TOKENS.radii.pill,
  },
  totalBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: TOKENS.colors.textSecondary,
  },
  descText: {
    fontSize: 12,
    lineHeight: 17,
    color: TOKENS.colors.textSecondary,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: TOKENS.colors.sandDeep,
  },
  actionBtnCall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.terracotta,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: TOKENS.radii.pill,
  },
  actionBtnCallText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
  },
  actionBtnEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.oat,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  actionBtnEmailText: {
    fontSize: 11,
    fontWeight: '600',
    color: TOKENS.colors.textPrimary,
  },
  actionBtnWeb: {
    padding: 6,
    backgroundColor: TOKENS.colors.sandDeep,
    borderRadius: TOKENS.radii.pill,
  },
  actionBtnPets: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 'auto',
    backgroundColor: TOKENS.colors.terracottaBg,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: TOKENS.radii.pill,
  },
  actionBtnPetsText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.terracottaDark,
  },
});
