import { View, Text, FlatList, StyleSheet, Linking } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import IconButton from '../components/IconButton';
import { removeNumber, clearAllNumbers } from '../redux/savedNumbersReducer';
import { AppDispatch } from '../redux/store';
import { SavedNumbersProps } from '../navigation/AppNavigator';
import * as Haptics from 'expo-haptics';

interface RenderItemProps {
  item: {
    id: string;
    name: string;
    number: string;
  };
}

const SavedNumbers = ({ route, navigation }: SavedNumbersProps) => {
  const numbers = useSelector((state: RootState) => state.savedNumbers);
  const dispatch = useDispatch<AppDispatch>();

  const openWhatsApp = (number: string) => {
    Linking.openURL(`https://wa.me/${number}`);
  };

  const deleteNumber = (id: string) => {
    dispatch(removeNumber(id));
  };

  const clearAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(clearAllNumbers());
  };

  const RenderItem = ({ item }: RenderItemProps) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.detailsColumn}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.number}</Text>
        </View>
        <View style={styles.actionsColumn}>
          <IconButton
            iconLibrary='FontAwesome'
            iconName='whatsapp'
            onPress={openWhatsApp.bind(null, item.number)}
          />
          <IconButton
            iconLibrary='MaterialCommunityIcons'
            iconName='delete-outline'
            onPress={deleteNumber.bind(null, item.id)}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Saved Numbers</Text>
      {numbers.length > 0 && (
        <Text onPress={clearAll} style={styles.subtitle}>
          Clear All
        </Text>
      )}
      <FlatList
        data={numbers}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
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
