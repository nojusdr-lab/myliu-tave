import React, { useState, useRef, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { PETS } from './src/data/pets';
import { TOKENS } from './src/theme/tokens';
import Header from './src/components/Header';
import CardStack from './src/components/CardStack';
import ActionButtons from './src/components/ActionButtons';
import MatchModal from './src/components/MatchModal';
import PetDetailsModal from './src/components/PetDetailsModal';
import LikesDrawer from './src/components/LikesDrawer';
import SheltersView from './src/components/SheltersView';
import GrainOverlay from './src/components/GrainOverlay';

export default function App() {
  const [lang, setLang] = useState('lt');
  const [activeTab, setActiveTab] = useState('pets'); // 'pets' | 'shelters'
  const [filter, setFilter] = useState('all'); // 'all' | 'dog' | 'cat'
  const [isUrgent, setIsUrgent] = useState(false); // "Skubiausi" toggle
  const [cityFilter, setCityFilter] = useState('all'); // 11 Lithuanian cities + all
  const [likedPets, setLikedPets] = useState([]);
  const [passedPets, setPassedPets] = useState([]);
  const [matchedPet, setMatchedPet] = useState(null);
  const [isMatchModalVisible, setIsMatchModalVisible] = useState(false);
  const [detailsPet, setDetailsPet] = useState(null);
  const [isLikesDrawerVisible, setIsLikesDrawerVisible] = useState(false);

  const stackRef = useRef(null);

  // Compute filtered & sorted pets list
  const filteredPets = useMemo(() => {
    let result = [...PETS];

    // 1. Filter by species
    if (filter !== 'all') {
      result = result.filter((p) => p.species === filter);
    }

    // 2. Filter by city
    if (cityFilter !== 'all') {
      const cityMatches = result.filter(
        (p) => p.city.toLowerCase() === cityFilter.toLowerCase()
      );
      // If mock pets have direct matches for this city, show them;
      // if not yet in mock data, show all so the stack remains interactive
      if (cityMatches.length > 0) {
        result = cityMatches;
      }
    }

    // 3. "Skubiausi" (Longest waiting) sort
    if (isUrgent) {
      result.sort((a, b) => (b.waitingDays || 0) - (a.waitingDays || 0));
    }

    return result;
  }, [filter, cityFilter, isUrgent]);

  // Handle Swipes
  const handleSwipeRight = (pet) => {
    if (!pet) return;
    setLikedPets((prev) => {
      if (prev.some((p) => p.id === pet.id)) return prev;
      return [pet, ...prev];
    });
    setMatchedPet(pet);
    setIsMatchModalVisible(true);
  };

  const handleSwipeLeft = (pet) => {
    if (!pet) return;
    setPassedPets((prev) => [pet, ...prev]);
  };

  const handleRewind = () => {
    if (stackRef.current) {
      stackRef.current.rewind();
    }
  };

  const handlePass = () => {
    if (stackRef.current) {
      stackRef.current.swipeLeft();
    }
  };

  const handleLike = () => {
    if (stackRef.current) {
      stackRef.current.swipeRight();
    }
  };

  const handleInfo = () => {
    if (filteredPets.length > 0) {
      setDetailsPet(filteredPets[0]);
    }
  };

  const handleRemoveLike = (petId) => {
    setLikedPets((prev) => prev.filter((p) => p.id !== petId));
  };

  const handleResetStack = () => {
    setPassedPets([]);
  };

  const handleSelectShelterPets = (city) => {
    setCityFilter(city);
    setActiveTab('pets');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={TOKENS.colors.sand}
      />

      {/* Tactile Organic Grain Overlay */}
      <GrainOverlay />

      <View style={styles.appContainer}>
        {/* Top Header: Brand, Language Toggle, Tab Switcher, Species + Skubiausi, City Bar */}
        <Header
          lang={lang}
          setLang={setLang}
          filter={filter}
          setFilter={setFilter}
          isUrgent={isUrgent}
          setIsUrgent={setIsUrgent}
          cityFilter={cityFilter}
          setCityFilter={setCityFilter}
          likedCount={likedPets.length}
          onOpenLikes={() => setIsLikesDrawerVisible(true)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* View Switcher: Augintiniai (Cards) vs Prieglaudos (Shelters) */}
        {activeTab === 'pets' ? (
          <>
            {/* Swipeable Pet Card Stack */}
            <CardStack
              stackRef={stackRef}
              pets={filteredPets}
              lang={lang}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
              onOpenDetails={(pet) => setDetailsPet(pet)}
              onResetStack={handleResetStack}
              onOpenLikes={() => setIsLikesDrawerVisible(true)}
              likedCount={likedPets.length}
            />

            {/* Action Controls: Rewind, Pass, Info, Like with Breathing Pulse */}
            <ActionButtons
              onRewind={handleRewind}
              onPass={handlePass}
              onInfo={handleInfo}
              onLike={handleLike}
              canRewind={true}
            />
          </>
        ) : (
          /* "Prieglaudos" Shelters Directory View */
          <SheltersView
            lang={lang}
            onSelectShelterPets={handleSelectShelterPets}
          />
        )}
      </View>

      {/* "Valio! Susisiekite su prieglauda" Modal on Swipe Right */}
      <MatchModal
        visible={isMatchModalVisible}
        pet={matchedPet}
        lang={lang}
        onClose={() => setIsMatchModalVisible(false)}
      />

      {/* Detailed Pet Profile & Shelter Inspection Sheet */}
      <PetDetailsModal
        visible={Boolean(detailsPet)}
        pet={detailsPet}
        lang={lang}
        onClose={() => setDetailsPet(null)}
        onLikeFromDetails={(pet) => {
          setDetailsPet(null);
          handleSwipeRight(pet);
        }}
      />

      {/* Saved Likes Drawer */}
      <LikesDrawer
        visible={isLikesDrawerVisible}
        likedPets={likedPets}
        lang={lang}
        onClose={() => setIsLikesDrawerVisible(false)}
        onSelectPet={(pet) => {
          setMatchedPet(pet);
          setIsMatchModalVisible(true);
        }}
        onRemoveLike={handleRemoveLike}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TOKENS.colors.sand,
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: TOKENS.colors.sand,
    ...(Platform.OS === 'web'
      ? {
          height: '100vh',
          boxShadow: '0 0 30px rgba(43, 35, 29, 0.1)',
        }
      : {}),
  },
});
