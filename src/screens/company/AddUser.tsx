import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Input} from '../../components';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createUser} from '../../db';
import {useNavigation} from '@react-navigation/native';

interface UserForm {
  fullname: string;
  username: string;
  password: string;
}

export const AddUser = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const {control, handleSubmit} = useForm<UserForm>();

  const handleAddUser = async (data: UserForm) => {
    Keyboard.dismiss();
    try {
      await createUser({
        ...data,
        role: 'USER',
      });

      Toast.show({
        position: 'bottom',
        type: 'success',
        text1: 'Usuario agregado correctamente',
      });
    } catch (error) {
      const message = error.message.includes(
        'code 2067 SQLITE_CONSTRAINT_UNIQUE',
      )
        ? 'El usuario ya se encuentra registrado'
        : '';
      Toast.show({
        position: 'bottom',
        type: 'error',
        text1: `Hubo un error al agregar al usuario.`,
        text2: message && `${message}`,
      });
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text
          className="absolute left-3 top-[10px]"
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="close-outline" size={35} color="rgb(100 116 139)" />;
        </Text>
        <View className="p-5 m-5 mt-8">
          <Text className="text-2xl text-gray-700">Agregar usuarios</Text>
          <Input
            control={control}
            inputName="Nombre"
            name="fullname"
            placeholder="Ingresa el nombre completo"
            autoCorrect={false}
            rules={{
              required: {value: true, message: 'El campo no puede estar vacío'},
              maxLength: {value: 100, message: 'El nombre es demasiado grande'},
            }}
          />
          <Input
            control={control}
            inputName="Usuario"
            name="username"
            placeholder="Ingresa el nombre de usuario"
            autoCapitalize="none"
            autoCorrect={false}
            rules={{
              required: {value: true, message: 'El campo no puede estar vacío'},
              maxLength: {
                value: 100,
                message: 'El usuario es demasiado grande',
              },
            }}
          />
          <Input
            control={control}
            inputName="Password"
            name="password"
            placeholder="Ingresa la contraseña"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            icon={showPassword ? 'eye-outline' : 'eye-off-outline'}
            onIconPress={() => setShowPassword(!showPassword)}
            rules={{
              required: {value: true, message: 'El campo no puede estar vacío'},
              maxLength: {value: 16, message: 'Contraseña demasiado grande'},
            }}
          />
          <Button className="mt-10" onPress={handleSubmit(handleAddUser)}>
            <Text className="text-white">Agregar</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
