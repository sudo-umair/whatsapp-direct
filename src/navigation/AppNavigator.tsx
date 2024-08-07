import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Settings from '../screens/Settings';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { StatusBar } from 'expo-status-bar';

import WallpaperDark from '../../assets/Wallpapers/wallpaperDark.png';
import WallpaperLight from '../../assets/Wallpapers/wallpaperLight.jpeg';

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colorScheme } = useSelector((state: RootState) => state.user.userSettings);

  const isDarkEnabled = colorScheme === 'dark';

  return (
    <>
      <ImageBackground
        source={isDarkEnabled ? WallpaperDark : WallpaperLight}
        style={styles.rootContainer}
        resizeMode='cover'
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: 'transparent',
              },
              animation: 'slide_from_right',
              navigationBarColor: colorScheme === 'dark' ? 'black' : '#008565',
            }}
          >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Settings' component={Settings} />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
      <StatusBar style='light' backgroundColor={colorScheme === 'dark' ? 'black' : '#008565'} />
    </>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
