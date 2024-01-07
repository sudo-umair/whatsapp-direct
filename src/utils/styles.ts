import { StyleSheet } from 'react-native';
import { userSettings } from '../redux/userReducer';

const stylesExt = StyleSheet.create({
  dark: {
    color: 'white',
    textDecorationColor: 'white',
    borderColor: 'white',
  },
  light: {
    color: 'black',
    textDecorationColor: 'black',
    borderColor: 'black',
  },
});

export const getTheme = (colorScheme: userSettings['colorScheme']) => {
  if (colorScheme === 'dark') {
    return stylesExt.dark;
  } else {
    return stylesExt.light;
  }
};
