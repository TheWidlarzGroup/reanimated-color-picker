import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {mkUseStyles, Theme, Box} from '../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../context/UserContext';

export const Animation = () => {
  const styles = useStyles();
  const {userColor} = useUserContext();
  const navigation = useNavigation();

  const onChangeColor = () => navigation.navigate('BubbleContainer');

  return (
    <Box alignItems="center" flex={1} justifyContent="center">
      <Text style={styles.title}>Your color</Text>
      <TouchableOpacity
        onPress={onChangeColor}
        style={[styles.colorButton, {backgroundColor: userColor || 'black'}]}
      />
    </Box>
  );
};
const useStyles = mkUseStyles((theme: Theme) => ({
  colorButton: {
    marginTop: theme.spacing.xm,
    height: 44,
    width: 44,
    borderRadius: theme.borderRadii.full,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
}));
