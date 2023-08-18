import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();

  return (
    <View className="px-16 h-screen">
      <View className="flex justify-center items-center mt-40">
        <Image
          className="w-[100px] h-[100px]"
          source={require('../../assets/images/Logo_Meda.png')}
        />
      </View>
      <View className="flex flex-1 gap-y-5 items-center justify-center mt-[-100px]">
        <Pressable
          className="flex w-full items-center py-4 rounded-full bg-sky-600 active:bg-sky-700"
          onPress={() => {
            navigation.navigate('CompanyLogin' as never);
          }}>
          <Text className="text-white">Login empresa</Text>
        </Pressable>
        <Pressable
          className="flex w-full items-center py-4 rounded-full bg-sky-600 active:bg-sky-700"
          onPress={() => {
            navigation.navigate('EmployeeLogin' as never);
          }}>
          <Text className="text-white">Login empleado</Text>
        </Pressable>
        <Pressable
          className="flex w-full items-center py-4 rounded-full bg-sky-600 active:bg-sky-700"
          onPress={() => {
            navigation.navigate('Posts' as never);
          }}>
          <Text className="text-white">Posts</Text>
        </Pressable>
      </View>
    </View>
  );
};
