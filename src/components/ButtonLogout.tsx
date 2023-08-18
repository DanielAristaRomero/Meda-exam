import React, {useContext} from 'react';
import {Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';

export const ButtonLogout = () => {
  const {logOut} = useContext(AuthContext);
  return (
    <View className="absolute right-3 top-[15px]">
      <Pressable
        className="flex-row justify-center items-center py-2 px-3 rounded-full bg-sky-600 active:bg-sky-700"
        onPress={logOut}>
        <Icon name="log-out-outline" size={25} color="white" />
      </Pressable>
    </View>
  );
};
