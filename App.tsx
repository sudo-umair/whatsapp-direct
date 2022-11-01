import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  const [fontsLoaded] = useFonts({
    UbuntuRegular: require('./assets/Fonts/Ubuntu-Regular.ttf'),
    UbuntuItalic: require('./assets/Fonts/Ubuntu-Italic.ttf'),
    UbuntuMedium: require('./assets/Fonts/Ubuntu-Medium.ttf'),
    UbuntuMediumItalic: require('./assets/Fonts/Ubuntu-MediumItalic.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.rootContainer} onLayout={onLayoutRootView}>
          <AppNavigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
