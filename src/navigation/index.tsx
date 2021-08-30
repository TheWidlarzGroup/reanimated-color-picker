import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Animation} from '../components/Animation';
import {AppRoutes} from './types';
import {BubbleContainer} from '../components/BubbleContainer';

const AppStack = createStackNavigator<AppRoutes>();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <AppStack.Navigator headerMode="none" initialRouteName="Animation">
          <AppStack.Screen name="Animation" component={Animation} />
          <AppStack.Screen name="BubbleContainer" component={BubbleContainer} />
        </AppStack.Navigator>
      </View>
    </NavigationContainer>
  );
};
