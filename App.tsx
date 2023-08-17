import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';

export const App = () => {
  return (
    <NavigationContainer>
      <View className="bg-white">
        <Text>Initial APP</Text>
      </View>
    </NavigationContainer>
  );
};
