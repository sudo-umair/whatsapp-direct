import { View, Text, StyleSheet, Switch } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from '../redux/userReducer';
import { RootState, AppDispatch } from '../redux/store';
import { getTheme } from '../utils/styles';
import { Linking } from 'react-native';

const Settings = () => {
  const colorScheme = useSelector((state: RootState) => state.user.userSettings.colorScheme);

  const isDarkEnabled = useMemo(() => colorScheme === 'dark', [colorScheme]);

  const dispatch = useDispatch<AppDispatch>();

  const toggleDarkMode = () => {
    dispatch(toggleMode(isDarkEnabled ? 'light' : 'dark'));
  };

  const openGithub = () => {
    Linking.openURL('https://github.com/sudo-umair');
  };

  const theme = useMemo(() => getTheme(colorScheme), [colorScheme]);

  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, theme]}>Settings</Text>
      <View style={styles.container}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingItem, theme]}>Dark Mode</Text>
          <Switch
            trackColor={{ false: 'red', true: '#008565' }}
            thumbColor='#f4f3f4'
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleDarkMode}
            value={isDarkEnabled}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={[styles.DEV_INFO_TEXT, theme]}>Developed by: Muhammad Umair</Text>
        <Text onPress={openGithub} style={[styles.DEV_INFO_TEXT, theme, styles.link]}>
          Github: @sudo-umair
        </Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: '5%',
  },
  title: {
    marginTop: '10%',
    marginBottom: '5%',
    fontFamily: 'UbuntuRegular',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  settingItem: {
    fontFamily: 'UbuntuRegular',
    color: 'white',
    fontSize: 18,
  },
  container: {
    marginTop: '20%',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '3%',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    padding: '5%',
    alignSelf: 'center',
  },
  DEV_INFO_TEXT: {
    fontFamily: 'UbuntuRegular',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
