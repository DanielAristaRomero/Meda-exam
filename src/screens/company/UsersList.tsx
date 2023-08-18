import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {getUsers} from '../../db';
import {User} from '../../models';
import {ButtonLogout} from '../../components';

export const UsersList = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<Partial<User>[] | []>([]);

  const focusEffect = useCallback(() => {
    const fetchUsers = async () => {
      try {
        const usersDB = await getUsers();
        setUsers(usersDB);
      } catch (error) {
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: 'Hubo un error al cargar los usuarios',
        });
      }
    };
    fetchUsers();
  }, []);

  useFocusEffect(focusEffect);

  return (
    <SafeAreaView>
      <ButtonLogout />
      <View className="p-5 m-5 mt-8">
        <Text className="text-2xl text-gray-700 mb-5">Usuarios</Text>
        <FlatList
          className="h-[85vh]"
          data={users}
          renderItem={({item}) => UserView(item)}
        />
      </View>
      <View className="absolute bottom-5 right-4">
        <Pressable
          className="flex-row justify-center items-center py-3 px-3 rounded-full bg-sky-600 active:bg-sky-700"
          onPress={() => navigation.navigate('AddUser' as never)}>
          <Icon name="add-outline" size={35} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const UserView = (user: Partial<User>) => {
  return (
    <View className="flex flex-row items-center px-3 py-3 border-t border-t-slate-300">
      <Text>
        <Icon name="person-circle-outline" size={45} color="rgb(75 85 99)" />
      </Text>
      <View className="flex ml-2">
        <Text numberOfLines={1} className="text-gray-700 text-lg max-w-[250px]">
          {user.fullname}
        </Text>
        <Text className="text-gray-500 text-base">{user.username}</Text>
      </View>
    </View>
  );
};
