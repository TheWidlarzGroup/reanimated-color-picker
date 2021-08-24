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
  const [dropColor, setDropColor] = useState(theme.colors.disabledText);
  const {width, height} = useWindowDimensions();
  const dropTop = useSharedValue(height - 175);
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
    dropTop.value = withTiming(-50, {duration: 600});
    dropHeight.value = withTiming(1.5 * height, {duration: 600});
  };

  const animatedDrop = useAnimatedStyle(() => ({
    top: dropTop.value,
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
        <Text marginHorizontal="xxl">
          Pick your favourite color and drop it in the grey area below
        </Text>
      </Box>
      <Animated.View
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            left: width / 2 - 500,
            zIndex: dropColor === theme.colors.disabledText ? 0 : 3,
          },
        ]}
      />
      {bubbles.map(bubble => (
        <Box position="absolute" key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={56}
            dropArea={dropTop.value}
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
  scaleCheckmark: {
    transform: [{scale: 2}],
  },
}));
