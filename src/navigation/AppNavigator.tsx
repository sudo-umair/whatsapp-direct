import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SavedNumbers from '../screens/SavedNumbers';
import SaveNumber from '../screens/SaveNumber';

type RootStackParamList = {
  Home: undefined;
  SavedNumbers: undefined;
  SaveNumber: {
    id?: string;
    number: string;
    name?: string;
    screen?: string;
  };
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type SaveNumberProps = NativeStackScreenProps<RootStackParamList, 'SaveNumber'>;
type SavedNumbersProps = NativeStackScreenProps<
  RootStackParamList,
  'SavedNumbers'
>;
export type { HomeScreenProps, SavedNumbersProps, SaveNumberProps };

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='SaveNumber' component={SaveNumber} />
        <Stack.Screen name='SavedNumbers' component={SavedNumbers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
