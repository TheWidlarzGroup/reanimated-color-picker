import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../context/UserContext';

export const Animation = () => {
  const {userColor} = useUserContext();
  const navigation = useNavigation();

  const onChangeColor = () => navigation.navigate('BubbleContainer');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your color</Text>
      <TouchableOpacity
        onPress={onChangeColor}
        style={[styles.colorButton, {backgroundColor: userColor || 'black'}]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorButton: {
    marginTop: 12,
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
});
