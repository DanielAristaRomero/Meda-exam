import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input, Button} from './';

interface LoginForm {
  username: string;
  password: string;
}

interface LoginProps {
  error: string;
  handleLogin: (data: LoginForm) => void;
}

export const Login = ({handleLogin, error}: LoginProps) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const {control, handleSubmit} = useForm<LoginForm>();

  return (
    <SafeAreaView className="flex flex-1 justify-center">
      <Text
        className="absolute left-3 top-[10px]"
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="close-outline" size={35} color="rgb(100 116 139)" />;
      </Text>
      <View className="p-5 m-5">
        <Text className="text-3xl text-gray-700 text-center">Bienvenido</Text>
        <Text className="text-base text-gray-500 text-center">
          Ingresa tus datos para iniciar sesión
        </Text>
        {error && (
          <Text className="text-red-400 text-center mt-4">{error}</Text>
        )}
        <Input
          control={control}
          inputName="Usuario"
          name="username"
          placeholder="Ingresa tu usuario"
          autoCorrect={false}
          rules={{
            required: {value: true, message: 'El campo no puede estar vacío'},
            maxLength: {value: 100, message: 'El nombre es demasiado grande'},
          }}
        />
        <Input
          control={control}
          inputName="Password"
          name="password"
          placeholder="Ingresa tu contraseña"
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
        <Button
          className="mt-8 flex-row justify-center"
          onPress={handleSubmit(handleLogin)}>
          <Text className="text-white">Iniciar sesión</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};
