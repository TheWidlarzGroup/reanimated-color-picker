import React, {useState} from 'react';
import {
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {randomFromRange} from '../utils/helpers';
import IconBack from '../assets/icon-back-white.svg';
import {Bubble} from './Bubble';
import {COLORS} from '../utils/mockedColors';
import {CONSTANTS as C} from '../utils/helpers';

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
  const {goBack} = useNavigation();
  const [dropColor, setDropColor] = useState('grey');
  const {width, height} = useWindowDimensions();
  const dropAreaTop = useSharedValue(height - C.DROP_AREA_OFFSET);
  const dropHeight = useSharedValue(C.DROP_AREA_INIT_SIZE);

  const initBubbles = COLORS.map(color => ({
    ...color,
    position: {
      x: randomFromRange(C.BUBBLE_SIZE, width - C.BUBBLE_SIZE),
      y: randomFromRange(
        C.BUBBLES_OFFSET_LEFT,
        height - C.BUBBLES_OFFSET_BOTTOM,
      ),
    },
  }));
  const [bubbles] = useState<BubbleProps[]>(initBubbles);

  const animateDropArea = (color: string) => {
    setDropColor(color);
    dropAreaTop.value = withTiming(C.DROP_AREA_OFFSET_TOP, {duration: 600});
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Pick your favourite color and drop it in the light grey area below
        </Text>
      </View>
      <Animated.View
        style={[
          styles.dropArea,
          animatedDrop,
          {
            backgroundColor: dropColor,
            left: width / 2 - C.DROP_AREA_INIT_SIZE / 2,
            zIndex: dropColor === 'grey' ? 0 : 3,
          },
        ]}
      />
      {bubbles.map(bubble => (
        <View style={{position: 'absolute'}} key={bubble.id}>
          <Bubble
            {...bubble}
            diameter={C.BUBBLE_SIZE}
            dropAreaTop={dropAreaTop.value}
            animateDropArea={animateDropArea}
          />
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 75,
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 50,
    color: 'white',
    textAlign: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
    top: 65,
    zIndex: 2,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexWrap: 'wrap',
  },
  dropArea: {
    position: 'absolute',
    width: C.DROP_AREA_INIT_SIZE,
    borderRadius: C.DROP_AREA_INIT_SIZE / 2,
  },
});
