import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {getPosts} from '../../services/getPosts';
import {Post} from '../../models';

export const Posts = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[] | []>([]);

  const focusEffect = useCallback(() => {
    const fetchUsers = async () => {
      try {
        const response = await getPosts();
        setPosts(response);
        setIsLoading(false);
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
      <Text
        className="absolute left-3 top-[10px]"
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="close-outline" size={35} color="rgb(100 116 139)" />;
      </Text>
      <View className="m-5 mt-14">
        <Text className="px-5 text-2xl text-gray-700 mb-5">Posts</Text>
        {isLoading ? (
          <View className="flex justify-center mt-10">
            <View>
              <ActivityIndicator size={80} />
              <Text className="text-gray-700 text-lg text-center">
                Recuperando posts...
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            className="h-[85vh] px-3"
            data={posts}
            renderItem={({item}) => PostView(item)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const PostView = ({title, body}: Post) => {
  return (
    <View className="flex flex-row items-center px-3 py-3 border border-slate-300 rounded-lg mb-3">
      <View className="flex ml-2">
        <Text numberOfLines={1} className="text-gray-700 text-lg max-w-[250px]">
          {title}
        </Text>
        <Text className="text-gray-500 text-base">{body}</Text>
      </View>
    </View>
  );
};
