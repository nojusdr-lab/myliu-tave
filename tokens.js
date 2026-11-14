// Aesthetic Anchor: Organic (Frontend Design Skill)
// Earth tones: sage, clay, terracotta, ochre, moss; sand and oat surfaces.
// Forbidden: cream (#F0-F8 warm-paper range), cold greys, pure whites (#FFFFFF), pure blacks (#000000), hard rectangles.

export const TOKENS = {
  colors: {
    // Primary earth tones
    sage: '#8B9D83',
    sageDark: '#5E7356',
    sageLight: '#A9BCA3',
    sageBg: '#E1E9DF',

    clay: '#B08B6E',
    clayDark: '#876449',
    clayLight: '#C7A58B',
    clayBg: '#EFE7DF',

    terracotta: '#C66B3D',
    terracottaDark: '#A65328',
    terracottaLight: '#DC8255',
    terracottaBg: '#F3E4DC',

    ochre: '#C08E3A',
    ochreDark: '#996E28',
    ochreLight: '#D8A856',
    ochreBg: '#F2EBDC',

    moss: '#606C38',
    mossDark: '#434D25',
    mossLight: '#7E8D4D',
    mossBg: '#E5EAD9',

    // Neutral earth surfaces (Never cream #F0-F8)
    sand: '#E8DCC7',         // Main app background
    sandDeep: '#DECDB5',     // Accent background / borders
    oat: '#D4B895',          // Secondary panels & highlights
    cardSurface: '#EFE6D8',  // Card body (warm textured earth)
    cardBorder: '#D8CBBA',   // Tactile card border
    cardOverlay: 'rgba(43, 35, 29, 0.72)',

    // Typography colors (Deep warm bark/soil, never pure black #000)
    textPrimary: '#2B231D',
    textSecondary: '#5E5045',
    textMuted: '#847568',
    textInverse: '#FAF5EE',  // Warm oat-milk tint for high contrast on terracotta/moss

    // Semantic actions
    like: '#C66B3D',         // Warm terracotta
    pass: '#B08B6E',         // Clay
    info: '#8B9D83',         // Sage
    rewind: '#C08E3A',       // Ochre
    verified: '#606C38',     // Moss
  },

  radii: {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    modal: 32,
    pill: 999,
  },

  typography: {
    // Humanist serif / warm styling
    display: {
      fontFamily: 'Georgia',
      fontWeight: '700',
    },
    title: {
      fontFamily: 'Georgia',
      fontWeight: '600',
    },
    body: {
      fontWeight: '400',
    },
    medium: {
      fontWeight: '500',
    },
    bold: {
      fontWeight: '600',
    },
  },

  shadows: {
    organic: {
      shadowColor: '#2B231D',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 18,
      elevation: 6,
    },
    card: {
      shadowColor: '#2B231D',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.16,
      shadowRadius: 24,
      elevation: 8,
    },
    button: {
      shadowColor: '#2B231D',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 10,
      elevation: 4,
    },
  },
};
