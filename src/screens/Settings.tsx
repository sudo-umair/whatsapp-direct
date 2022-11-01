import { View, Text, StyleSheet, Switch } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from '../redux/userReducer';
import { RootState, AppDispatch } from '../redux/store';

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { colorScheme } = useSelector(
    (state: RootState) => state.user.userSettings
  );

  const [isDarkEnabled, setIsDarkEnabled] = React.useState(
    colorScheme === 'dark'
  );

  const toggleDarkMode = () => {
    if (isDarkEnabled) {
      setIsDarkEnabled(false);
      dispatch(toggleMode('light'));
    } else {
      setIsDarkEnabled(true);
      dispatch(toggleMode('dark'));
    }
  };

  const stylesExt = StyleSheet.create({
    text: {
      color: colorScheme === 'dark' ? 'white' : 'black',
      textDecorationColor: colorScheme === 'dark' ? 'white' : 'black',
      borderColor: colorScheme === 'dark' ? 'white' : 'black',
    },
  });

  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, stylesExt.text]}>Settings</Text>
      <View style={styles.container}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingItem, stylesExt.text]}>Dark Mode</Text>
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
        <Text style={[styles.DEV_INFO_TEXT, stylesExt.text]}>
          Developed by: Muhammad Umair
          {'\n'}
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
});
