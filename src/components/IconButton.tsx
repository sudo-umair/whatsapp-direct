import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import * as Haptics from 'expo-haptics';

interface IconButtonProps {
  iconName:
    | React.ComponentProps<typeof FontAwesome>['name']
    | React.ComponentProps<typeof MaterialCommunityIcons>['name']
    | React.ComponentProps<typeof MaterialIcons>['name'];
  iconLibrary: 'FontAwesome' | 'MaterialCommunityIcons' | 'MaterialIcons';
  onPress: () => void;
}

const IconButton = ({ iconLibrary, iconName, onPress }: IconButtonProps) => {
  let DynamicIcon: any;

  switch (iconLibrary) {
    case 'FontAwesome':
      DynamicIcon = FontAwesome;
      break;
    case 'MaterialCommunityIcons':
      DynamicIcon = MaterialCommunityIcons;
      break;
    case 'MaterialIcons':
      DynamicIcon = MaterialIcons;
      break;
  }

  const onPressHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable style={styles.container} onPress={onPressHandler}>
      <DynamicIcon name={iconName} size={18} color='white' />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderWidth: 0.3,
    borderColor: 'white',
    padding: 3,
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
