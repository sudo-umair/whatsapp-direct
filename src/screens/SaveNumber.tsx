import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useMemo } from 'react';
import { SaveNumberProps } from '../navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { addNumber, editNumber } from '../redux/savedNumbersReducer';
import { AppDispatch, RootState } from '../redux/store';
import * as Haptics from 'expo-haptics';
import { getTheme } from '../utils/styles';

export default function SaveNumber({ navigation, route }: SaveNumberProps) {
  const { number, name, id, screen } = route.params;
  const [nameInp, setNameInp] = React.useState<string>(name ?? '');
  const dispatch = useDispatch<AppDispatch>();

  const colorScheme = useSelector((state: RootState) => state.user.userSettings.colorScheme);

  const theme = useMemo(() => getTheme(colorScheme), [colorScheme]);

  const onSaveNumber = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (nameInp === '') {
      alert('Please enter a name');
    } else {
      if (screen === 'SavedNumbers') {
        dispatch(editNumber({ id, name: nameInp.trim() }));
      } else {
        dispatch(
          addNumber({
            id: Math.random().toString(),
            name: nameInp.trim(),
            number: number.trim(),
          })
        );
      }
      navigation.goBack();
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, theme]}>Save Number</Text>
      <View style={styles.container}>
        <Text style={[styles.text, theme]}>Enter Name for {number}</Text>
        <TextInput
          value={nameInp}
          style={[styles.input, theme]}
          onChangeText={(text) => setNameInp(text)}
          keyboardType='default'
          autoCapitalize='words'
        />
        <Text style={[styles.text, theme]}>Example: John Doe</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={onSaveNumber} title='Save' color='#008565' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: '5%',
  },
  title: {
    marginTop: '10%',
    fontFamily: 'UbuntuRegular',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  container: {
    marginTop: '20%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'UbuntuMedium',
  },
  input: {
    marginVertical: '1%',
    backgroundColor: 'transparent',
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    borderRadius: 20,
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'UbuntuRegular',
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
  buttonContainer: {
    marginTop: '10%',
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
