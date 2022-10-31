import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { SaveNumberProps } from '../navigation/AppNavigator';
import { useDispatch } from 'react-redux';
import { addNumber } from '../redux/savedNumbersReducer';
import { AppDispatch } from '../redux/store';

export default function SaveNumber({ navigation, route }: SaveNumberProps) {
  const { number } = route.params;
  const [name, setName] = React.useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const onSaveNumber = () => {
    if (name === '') {
      alert('Please enter a name');
    } else {
      dispatch(
        addNumber({
          id: Math.random().toString(),
          name: name.trim(),
          number: number.trim(),
        })
      );
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <Text style={styles.title}>Save Number</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Enter Name for {number}</Text>
        <TextInput
          value={name}
          style={styles.input}
          placeholder='Enter Name'
          onChangeText={(text) => setName(text)}
          keyboardType='default'
        />
        <View style={styles.buttonContainer}>
          <Button onPress={onSaveNumber} title='Save' />
        </View>
      </View>
    </KeyboardAvoidingView>
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
    fontFamily: 'UbuntuRegular',
  },
  input: {
    marginTop: '2%',
    backgroundColor: 'transparent',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
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
