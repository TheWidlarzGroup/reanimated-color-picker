import React, {useState} from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {Box, Text, mkUseStyles, theme} from '../utils/theme';
import {randomFromRange} from '../utils/helpers';
import IconBack from '../assets/icon-back-white.svg';
import {Bubble} from './Bubble';
import {COLORS} from '../utils/mockedColors';

export type Position = {
  x: number;
  y: number;
};

type BubbleProps = {
  position: Position;
  id: number | string;
  color: string;
};

export const BubbleContainer = () => {
  const styles = useStyles();
  const {goBack} = useNavigation();
  const [dropColor, setDropColor] = useState('grey');
  const {width, height} = useWindowDimensions();
  const dropAreaTop = useSharedValue(height - 175);
  const dropHeight = useSharedValue(1000);

  const initBubbles = COLORS.map(color => ({
    ...color,
    position: {
      x: randomFromRange(56, width - 56),
      y: randomFromRange(130, height - 250),
    },
  }));
  const [bubbles] = useState<BubbleProps[]>(initBubbles);

  const animateDropArea = () => {
    dropAreaTop.value = withTiming(-50, {duration: 600});
    dropHeight.value = withTiming(1.5 * height, {duration: 600});
  };

  const animatedDrop = useAnimatedStyle(() => ({
    top: dropAreaTop.value,
    height: dropHeight.value,
  }));

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={goBack}
        style={styles.backBtn}
        activeOpacity={0.2}>
        <IconBack />
      </TouchableOpacity>
      <Box marginTop="xxxl" alignItems="center">
        <Text marginHorizontal="xxl" color="white" textAlign="center">
          Pick your favourite color and drop it in the light grey area below
        </Text>
      </Box>
      <Animated.View
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            left: width / 2 - 500,
            zIndex: dropColor === 'grey' ? 0 : 3,
          },
        ]}
      />
      {bubbles.map(bubble => (
        <Box position="absolute" key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={56}
            dropAreaTop={dropAreaTop.value}
            setDropColor={setDropColor}
            animateDropArea={animateDropArea}
          />
        </Box>
      ))}
    </View>
  );
};
const useStyles = mkUseStyles(() => ({
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 65,
    zIndex: theme.zIndices['2'],
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexWrap: 'wrap',
  },
  dropArea: {
    position: 'absolute',
    width: 1000,
    borderRadius: 500,
  },
}));
