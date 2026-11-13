import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// Soft grain texture for the Organic aesthetic anchor (1-3% tactile grain)
export default function GrainOverlay() {
  if (Platform.OS === 'web') {
    // Generate fine SVG noise filter on web
    const svgNoise = `data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.04"/></svg>`;

    return (
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundImage: `url("${svgNoise}")`,
            backgroundRepeat: 'repeat',
            zIndex: 9999,
            opacity: 0.55,
          },
        ]}
      />
    );
  }

  // Mobile native subtle organic noise layer
  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: 'transparent',
          zIndex: 9999,
        },
      ]}
    />
  );
}
