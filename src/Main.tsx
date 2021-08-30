import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserContextProvider} from './context/UserContext';
import {AppNavigation} from './navigation';

export const Main = () => (
  <SafeAreaProvider>
    <UserContextProvider>
      <AppNavigation />
    </UserContextProvider>
  </SafeAreaProvider>
);
