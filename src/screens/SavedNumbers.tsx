import { View, Text, FlatList, StyleSheet, Linking } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import IconButton from '../components/IconButton';
import { removeNumber, clearAllNumbers } from '../redux/savedNumbersReducer';
import { AppDispatch } from '../redux/store';
import { SavedNumbersProps } from '../navigation/AppNavigator';
import * as Haptics from 'expo-haptics';
import { stylesExt } from '../utils/styles';

interface RenderItemProps {
  item: {
    id: string;
    name: string;
    number: string;
  };
}

const SavedNumbers = ({ route, navigation }: SavedNumbersProps) => {
  const { savedNumbers } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const { colorScheme } = useSelector(
    (state: RootState) => state.user.userSettings
  );

  const openWhatsAppHandler = (number: string) => {
    Linking.openURL(`https://wa.me/${number}`);
  };

  const deleteNumberHandler = (id: string) => {
    dispatch(removeNumber(id));
  };

  const editNumberHandler = (id: string, name: string, number: string) => {
    navigation.navigate('SaveNumber', {
      id,
      name,
      number,
      screen: 'SavedNumbers',
    });
  };

  const clearAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(clearAllNumbers());
  };

  const customStyles = () => {
    if (colorScheme === 'dark') {
      return stylesExt.dark;
    } else {
      return stylesExt.light;
    }
  };

  const RenderItem = ({ item }: RenderItemProps) => {
    return (
      <View style={[styles.itemContainer, customStyles()]}>
        <View style={styles.detailsColumn}>
          <Text style={[styles.itemText, customStyles()]}>{item.name}</Text>
          <Text style={[styles.itemText, customStyles()]}>{item.number}</Text>
        </View>
        <View style={styles.actionsColumn}>
          <IconButton
            iconLibrary='MaterialIcons'
            iconName='edit'
            onPress={() => editNumberHandler(item.id, item.name, item.number)}
          />
          <IconButton
            iconLibrary='FontAwesome'
            iconName='whatsapp'
            onPress={openWhatsAppHandler.bind(null, item.number)}
          />
          <IconButton
            iconLibrary='MaterialCommunityIcons'
            iconName='delete-outline'
            onPress={deleteNumberHandler.bind(null, item.id)}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, customStyles()]}>Saved Numbers</Text>
      {savedNumbers.length > 0 && (
        <Text onPress={clearAll} style={[styles.subtitle, customStyles()]}>
          Clear All
        </Text>
      )}
      <FlatList
        data={savedNumbers}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />
    </View>
  );
};

export default SavedNumbers;

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
  subtitle: {
    fontFamily: 'UbuntuRegular',
    color: 'white',
    textAlign: 'center',
    textDecorationColor: 'white',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  container: {
    marginTop: '20%',
  },
  listContainer: {
    marginTop: '5%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '4%',
    borderRadius: 10,
  },
  detailsColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionsColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'UbuntuRegular',
  },
});
