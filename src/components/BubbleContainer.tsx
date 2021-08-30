import React, {useState} from 'react';
import {
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Pick your favourite color and drop it in the light grey area below
        </Text>
      </View>
      <View
        style={[
          styles.dropArea,
          {
            backgroundColor: 'grey',
            top: height - C.DROP_AREA_OFFSET,
            left: width / 2 - C.DROP_AREA_INIT_SIZE / 2,
            zIndex: dropColor === 'grey' ? 0 : 3,
          },
        ]}
      />
      {bubbles.map(bubble => (
        <View style={{position: 'absolute'}} key={bubble.id}>
          <Bubble {...bubble} diameter={C.BUBBLE_SIZE} />
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
    height: C.DROP_AREA_INIT_SIZE,
    borderRadius: C.DROP_AREA_INIT_SIZE / 2,
  },
});
