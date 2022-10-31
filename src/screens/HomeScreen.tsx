import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { Link } from '@react-navigation/native';
import { HomeScreenProps } from '../navigation/AppNavigator';
import * as Haptics from 'expo-haptics';

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [number, setNumber] = React.useState<string>('');

  const onChatHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (number.length > 0) {
      Linking.openURL(`https://wa.me/${number}`);
    } else {
      alert('Please enter a valid number');
    }
  };

  const onSaveHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (number.length > 0) {
      navigation.navigate('SaveNumber', { number });
    } else {
      alert('Please enter a valid number');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <Text style={styles.title}>WhatsappDirect</Text>
      <Text style={styles.subtitle}>Send messages directly to Whatsapp</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Enter Number Below</Text>
        <TextInput
          value={number}
          style={styles.input}
          keyboardType='numeric'
          onChangeText={(text) => setNumber(text)}
        />
        <Text style={styles.text}>Example: 923321234567</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={onChatHandler} title='Open Whatsapp' />
        </View>
        <View style={[styles.buttonContainer, { marginTop: '5%' }]}>
          <Button onPress={onSaveHandler} title='Save' />
        </View>
        <Text style={styles.subText}>
          - Number should start with country code {'\n'}- Number should not
          contain any special characters {'\n'}- Number should not contain any
          spaces
        </Text>
      </View>
      <Link
        to={{
          screen: 'SavedNumbers',
        }}
        style={styles.link}
      >
        Go To Saved Numbers
      </Link>
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
  subtitle: {
    marginTop: '5%',
    fontFamily: 'UbuntuItalic',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    marginTop: '15%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'UbuntuRegular',
  },
  input: {
    marginVertical: '2%',
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
  subText: {
    color: 'white',
    fontFamily: 'UbuntuRegular',
    fontSize: 12,
    marginTop: '10%',
    lineHeight: 20,
    marginHorizontal: '2%',
  },
  buttonContainer: {
    marginTop: '10%',
    width: '50%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  link: {
    color: 'white',
    fontFamily: 'UbuntuRegular',
    fontSize: 20,
    marginTop: '10%',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
});
