import React, {useState} from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Box, Text, mkUseStyles, theme} from '../utils/theme';
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

  const initBubbles = COLORS.map(color => ({
    ...color,
    position: {
      x: 0,
      y: 0,
    },
  }));
  const [bubbles] = useState<BubbleProps[]>(initBubbles);

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
          Pick your favourite color and drop it in the grey area below
        </Text>
      </Box>
      <View
        style={[
          styles.dropArea,
          {
            backgroundColor: dropColor,
            top: height - 175,
            left: width / 2 - 500,
            zIndex: dropColor === theme.colors.disabledText ? 0 : 3,
            height: 1000,
            width: 1000,
            borderRadius: 1000 / 2,
          },
        ]}
      />
      {bubbles.map(bubble => (
        <Box position="absolute" key={bubble.id}>
          <Bubble {...bubble} diameter={56} />
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
