import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TOKENS } from '../theme/tokens';
import { TRANSLATIONS } from '../data/translations';

export default function LikesDrawer({
  visible,
  likedPets,
  lang,
  onClose,
  onSelectPet,
  onRemoveLike,
}) {
  const t = TRANSLATIONS[lang];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.heartIconWrap}>
                <Ionicons name="heart" size={18} color={TOKENS.colors.textInverse} />
              </View>
              <View>
                <Text style={styles.title}>{t.likesHeader}</Text>
                <Text style={styles.subtitle}>
                  {likedPets.length} {t.likesCountSuffix}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
              accessibilityLabel="Close"
            >
              <Ionicons name="close" size={20} color={TOKENS.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* List or Empty State */}
          {likedPets.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="heart-dislike-outline"
                size={44}
                color={TOKENS.colors.clayLight}
                style={{ marginBottom: 12 }}
              />
              <Text style={styles.emptyText}>{t.noLikesPrompt}</Text>
            </View>
          ) : (
            <FlatList
              data={likedPets}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.petItem}
                  onPress={() => {
                    onClose();
                    onSelectPet(item);
                  }}
                  activeOpacity={0.75}
                >
                  <Image
                    source={{ uri: item.photos?.[0] }}
                    style={styles.petThumb}
                  />
                  <View style={styles.petInfo}>
                    <Text style={styles.petName}>{item.name}</Text>
                    <Text style={styles.petMeta}>
                      {lang === 'lt' ? item.ageLt : item.ageEn} · {item.city}
                    </Text>
                    <Text style={styles.petShelter}>{item.shelter.name}</Text>
                  </View>

                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      style={styles.callBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        Linking.openURL(`tel:${item.shelter.phone}`);
                      }}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="call" size={14} color={TOKENS.colors.textInverse} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        onRemoveLike(item.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="trash-outline" size={15} color={TOKENS.colors.clayDark} />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(43, 35, 29, 0.65)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: TOKENS.colors.cardSurface,
    borderTopLeftRadius: TOKENS.radii.modal,
    borderTopRightRadius: TOKENS.radii.modal,
    maxHeight: '80%',
    minHeight: 340,
    borderWidth: 1.5,
    borderColor: TOKENS.colors.cardBorder,
    ...TOKENS.shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: TOKENS.colors.sandDeep,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heartIconWrap: {
    width: 34,
    height: 34,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: TOKENS.typography.title.fontFamily,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: TOKENS.colors.textSecondary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
    gap: 10,
  },
  petItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TOKENS.colors.sand,
    borderRadius: TOKENS.radii.lg,
    padding: 10,
    borderWidth: 1,
    borderColor: TOKENS.colors.sandDeep,
  },
  petThumb: {
    width: 56,
    height: 56,
    borderRadius: TOKENS.radii.md,
    backgroundColor: TOKENS.colors.sandDeep,
  },
  petInfo: {
    marginLeft: 12,
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: '700',
    color: TOKENS.colors.textPrimary,
    fontFamily: TOKENS.typography.title.fontFamily,
  },
  petMeta: {
    fontSize: 12,
    color: TOKENS.colors.textSecondary,
    marginTop: 1,
  },
  petShelter: {
    fontSize: 11,
    color: TOKENS.colors.mossDark,
    fontWeight: '600',
    marginTop: 2,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  callBtn: {
    width: 32,
    height: 32,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: TOKENS.radii.pill,
    backgroundColor: TOKENS.colors.cardSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: TOKENS.colors.textMuted,
    textAlign: 'center',
  },
});
