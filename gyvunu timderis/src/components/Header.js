import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TOKENS } from '../theme/tokens';
import { TRANSLATIONS } from '../data/translations';
import { CITIES } from '../data/shelters';

export default function Header({
  lang,
  setLang,
  filter,
  setFilter,
  isUrgent,
  setIsUrgent,
  cityFilter,
  setCityFilter,
  likedCount,
  onOpenLikes,
  activeTab,
  setActiveTab,
}) {
  const t = TRANSLATIONS[lang];

  const filterOptions = [
    { key: 'all', label: t.filterAll },
    { key: 'dog', label: t.filterDogs },
    { key: 'cat', label: t.filterCats },
  ];

  return (
    <View style={styles.container}>
      {/* Top row: Brand title, Tab switcher (Augintiniai / Prieglaudos), LT/EN Toggle, Likes counter */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Ionicons name="paw" size={17} color={TOKENS.colors.textInverse} />
          </View>
          <View>
            <Text style={styles.brandTitle}>{t.appTitle}</Text>
            <Text style={styles.brandSubtitle}>{t.appSubtitle}</Text>
          </View>
        </View>

        <View style={styles.actionsRight}>
          {/* LT / EN toggle */}
          <TouchableOpacity
            style={styles.langButton}
            onPress={() => setLang(lang === 'lt' ? 'en' : 'lt')}
            activeOpacity={0.7}
            accessibilityLabel="Toggle language"
          >
            <Text
              style={[
                styles.langOption,
                lang === 'lt' && styles.langOptionActive,
              ]}
            >
              LT
            </Text>
            <Text style={styles.langDivider}>·</Text>
            <Text
              style={[
                styles.langOption,
                lang === 'en' && styles.langOptionActive,
              ]}
            >
              EN
            </Text>
          </TouchableOpacity>

          {/* Likes drawer shortcut button */}
          <TouchableOpacity
            style={styles.likesPill}
            onPress={onOpenLikes}
            activeOpacity={0.7}
            accessibilityLabel={`${likedCount} ${t.likesCountSuffix}`}
          >
            <Ionicons
              name={likedCount > 0 ? 'heart' : 'heart-outline'}
              size={16}
              color={likedCount > 0 ? TOKENS.colors.terracotta : TOKENS.colors.textSecondary}
            />
            {likedCount > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{likedCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Tab Switcher: Augintiniai (Rescues) vs Prieglaudos (Shelters) */}
      <View style={styles.mainTabsRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'pets' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('pets')}
          activeOpacity={0.75}
        >
          <Ionicons
            name="layers-outline"
            size={14}
            color={activeTab === 'pets' ? TOKENS.colors.textInverse : TOKENS.colors.textSecondary}
            style={{ marginRight: 5 }}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'pets' && styles.tabTextActive,
            ]}
          >
            {t.tabPets}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'shelters' && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab('shelters')}
          activeOpacity={0.75}
        >
          <Ionicons
            name="business-outline"
            size={14}
            color={activeTab === 'shelters' ? TOKENS.colors.textInverse : TOKENS.colors.textSecondary}
            style={{ marginRight: 5 }}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'shelters' && styles.tabTextActive,
            ]}
          >
            {t.tabShelters}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Show Pet Filters & City Bar ONLY when on 'pets' tab */}
      {activeTab === 'pets' && (
        <>
          {/* Category Filters + "Skubiausi" Toggle */}
          <View style={styles.filterBar}>
            {/* Species segment: Visi / Šunys / Katės */}
            <View style={styles.speciesSegment}>
              {filterOptions.map((opt) => {
                const isActive = filter === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      styles.speciesPill,
                      isActive && styles.speciesPillActive,
                    ]}
                    onPress={() => setFilter(opt.key)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.speciesText,
                        isActive && styles.speciesTextActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* "Skubiausi" (Longest waiting 180+ days) Toggle */}
            <TouchableOpacity
              style={[
                styles.urgentToggle,
                isUrgent && styles.urgentToggleActive,
              ]}
              onPress={() => setIsUrgent(!isUrgent)}
              activeOpacity={0.75}
              accessibilityLabel={t.filterUrgentHint}
            >
              <Ionicons
                name={isUrgent ? 'flame' : 'flame-outline'}
                size={14}
                color={isUrgent ? TOKENS.colors.textInverse : TOKENS.colors.terracottaDark}
              />
              <Text
                style={[
                  styles.urgentText,
                  isUrgent && styles.urgentTextActive,
                ]}
              >
                {t.filterUrgent}
              </Text>
            </TouchableOpacity>
          </View>

          {/* City Horizontal Filter Bar (All 11 Lithuanian Cities + Visi with exact animal counts) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cityScroll}
            contentContainerStyle={styles.cityScrollContent}
          >
            {CITIES.map((city) => {
              const isSelected = cityFilter === city.id;
              const cityName = lang === 'lt' ? city.nameLt : city.nameEn;
              return (
                <TouchableOpacity
                  key={city.id}
                  style={[
                    styles.cityChip,
                    isSelected && styles.cityChipActive,
                  ]}
                  onPress={() => setCityFilter(city.id)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.cityChipName,
                      isSelected && styles.cityChipNameActive,
                    ]}
                  >
                    {cityName}
                  </Text>
                  <View
                    style={[
                      styles.cityCountBadge,
                      isSelected && styles.cityCountBadgeActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.cityCountText,
                        isSelected && styles.cityCountTextActive,
                      ]}
                    >
                      {city.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: 'transparent',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: TOKENS.radii.md,
    backgroundColor: TOKENS.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    ...TOKENS.shadows.button,
  },
  brandTitle: {
    fontSize: 20,
    fontFamily: TOKENS.typography.display.fontFamily,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
    letterSpacing: -0.4,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: TOKENS.colors.textSecondary,
    letterSpacing: 0.2,
    marginTop: -2,
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TOKENS.colors.oat,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  langOption: {
    fontSize: 11,
    fontWeight: '600',
    color: TOKENS.colors.textSecondary,
  },
  langOptionActive: {
    color: TOKENS.colors.terracottaDark,
    fontWeight: '800',
  },
  langDivider: {
    fontSize: 11,
    color: TOKENS.colors.textMuted,
    marginHorizontal: 2,
  },
  likesPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TOKENS.colors.oat,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
    minWidth: 34,
    justifyContent: 'center',
  },
  badgeCount: {
    marginLeft: 4,
    backgroundColor: TOKENS.colors.terracotta,
    borderRadius: TOKENS.radii.pill,
    minWidth: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeCountText: {
    fontSize: 9,
    fontWeight: '700',
    color: TOKENS.colors.textInverse,
  },

  // Main Tab Switcher (Augintiniai / Prieglaudos)
  mainTabsRow: {
    flexDirection: 'row',
    backgroundColor: TOKENS.colors.sandDeep,
    borderRadius: TOKENS.radii.pill,
    padding: 3,
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: TOKENS.radii.pill,
  },
  tabButtonActive: {
    backgroundColor: TOKENS.colors.sage,
    ...TOKENS.shadows.button,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: TOKENS.colors.textSecondary,
  },
  tabTextActive: {
    color: TOKENS.colors.textInverse,
    fontWeight: '700',
  },

  // Filter bar: Species + Skubiausi
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  speciesSegment: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: TOKENS.colors.sandDeep,
    borderRadius: TOKENS.radii.pill,
    padding: 2.5,
  },
  speciesPill: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: TOKENS.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speciesPillActive: {
    backgroundColor: TOKENS.colors.clay,
    ...TOKENS.shadows.button,
  },
  speciesText: {
    fontSize: 12,
    fontWeight: '600',
    color: TOKENS.colors.textSecondary,
  },
  speciesTextActive: {
    color: TOKENS.colors.textInverse,
    fontWeight: '700',
  },
  urgentToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: TOKENS.colors.terracottaBg,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.terracotta,
  },
  urgentToggleActive: {
    backgroundColor: TOKENS.colors.terracotta,
    borderColor: TOKENS.colors.terracottaDark,
    ...TOKENS.shadows.button,
  },
  urgentText: {
    fontSize: 11,
    fontWeight: '700',
    color: TOKENS.colors.terracottaDark,
  },
  urgentTextActive: {
    color: TOKENS.colors.textInverse,
  },

  // City Horizontal Selector
  cityScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginBottom: 2,
  },
  cityScrollContent: {
    gap: 6,
    paddingRight: 24,
  },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: TOKENS.colors.oat,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: TOKENS.radii.pill,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  cityChipActive: {
    backgroundColor: TOKENS.colors.moss,
    borderColor: TOKENS.colors.mossDark,
    ...TOKENS.shadows.button,
  },
  cityChipName: {
    fontSize: 11,
    fontWeight: '600',
    color: TOKENS.colors.textPrimary,
  },
  cityChipNameActive: {
    color: TOKENS.colors.textInverse,
    fontWeight: '700',
  },
  cityCountBadge: {
    backgroundColor: TOKENS.colors.sandDeep,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: TOKENS.radii.pill,
  },
  cityCountBadgeActive: {
    backgroundColor: TOKENS.colors.mossDark,
  },
  cityCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: TOKENS.colors.textSecondary,
  },
  cityCountTextActive: {
    color: TOKENS.colors.textInverse,
  },
});
