// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d', // Dark Blue
      800: '#153e75',
      700: '#2a69ac',
    },
    red: {
      500: '#E53E3E',
    }
  },
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
  },
});

export default theme;
