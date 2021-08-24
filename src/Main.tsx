import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@shopify/restyle';
import {UserContextProvider} from './context/UserContext';
import {darkTheme, theme} from './utils/theme';
import {AppNavigation} from './navigation';

export const Main = () => {
  const darkMode = false;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <SafeAreaProvider>
        <UserContextProvider>
          <AppNavigation />
        </UserContextProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};
