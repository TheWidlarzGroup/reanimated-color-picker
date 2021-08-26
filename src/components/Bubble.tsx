import React, {useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useUserContext} from '../context/UserContext';

type Position = {
  x: number;
  y: number;
};

type BubbleProps = {
  color: string;
  diameter: number;
  position: Position;
  dropAreaTop: number;
  setDropColor: (arg0: string) => void;
  animateDropArea: () => void;
};

export const Bubble = ({
  color,
  diameter,
  position,
  dropAreaTop,
  setDropColor,
  animateDropArea,
}: BubbleProps) => {
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const {setUserColor} = useUserContext();

  const initialX = position.x;
  const initialY = position.y;
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const bubbleSize = useSharedValue(0);
  const draggedBubbleScale = useSharedValue(1);
  const bubbleOpacity = useSharedValue(1);

  const randomDelay = Math.floor(Math.random() * 600);

  const handleSelection = () => {
    setUserColor(color);
    setDropColor(color);
    bubbleOpacity.value = 0;
    animateDropArea();
    setTimeout(() => navigation.goBack(), 2800);
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetY: number;
      offsetX: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
      if (translateY.value > dropAreaTop) {
        draggedBubbleScale.value = withTiming(1.2, {duration: 200});
      } else {
        draggedBubbleScale.value = withTiming(1, {duration: 200});
      }
    },
    onEnd: ({velocityX, velocityY}) => {
      translateX.value = withDecay({
        velocity: velocityX,
        clamp: [0, width - diameter],
      });
      translateY.value = withDecay({
        velocity: velocityY,
        clamp: [130, height - diameter],
      });
      if (translateY.value > dropAreaTop && draggedBubbleScale.value > 1) {
        runOnJS(handleSelection)();
      }
    },
  });

  const viewStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

  const BubbleStyle = useAnimatedStyle(() => ({
    width: withDelay(
      randomDelay,
      withTiming(bubbleSize.value, {duration: 600}),
    ),
    height: withDelay(
      randomDelay,
      withTiming(bubbleSize.value, {duration: 600}),
    ),
    borderRadius: withDelay(
      randomDelay,
      withTiming(bubbleSize.value, {duration: 600}),
    ),
    transform: [{scale: draggedBubbleScale.value}],
    opacity: bubbleOpacity.value,
  }));

  useEffect(() => {
    bubbleSize.value = diameter;
  }, [bubbleSize, diameter]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={viewStyle}>
        <Animated.View
          style={[
            BubbleStyle,
            {
              backgroundColor: color,
            },
          ]}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
