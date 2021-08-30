import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../context/UserContext';
import {CONSTANTS as C} from '../utils/helpers';

type Position = {
  x: number;
  y: number;
};

type BubbleProps = {
  color: string;
  diameter: number;
  position: Position;
};

export const Bubble = ({color, diameter, position}: BubbleProps) => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const {setUserColor} = useUserContext();

  return (
    <View
      style={[
        {
          backgroundColor: color,
          top: position.x,
          left: position.y,
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
        },
      ]}
    />
  );
};
