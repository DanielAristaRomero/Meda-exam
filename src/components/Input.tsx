import React from 'react';
import {useController} from 'react-hook-form';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export const Input = ({
  inputName,
  name,
  control,
  rules,
  icon,
  onIconPress,
  ...props
}: InputProps) => {
  const {field, fieldState} = useController({
    control,
    defaultValue: '',
    name,
    rules: rules,
  });
  return (
    <View className="mt-5">
      <Text className="text-black text-md mb-2">{inputName}</Text>
      <View className="relative">
        <TextInput
          className="px-3 border border-gray-400 rounded-full text-black bg-gray-50 focus:border-sky-500"
          value={field.value}
          onChangeText={field.onChange}
          placeholderTextColor="rgb(71 85 105)"
          {...props}
        />
        {fieldState.error && (
          <Text className="text-red-500 text-right ml-3">
            {fieldState.error.message}
          </Text>
        )}
        {icon && (
          <Text className="absolute right-3 top-[10px]" onPress={onIconPress}>
            <Icon name={icon} size={30} color="rgb(100 116 139)" />;
          </Text>
        )}
      </View>
    </View>
  );
};

interface InputProps {
  inputName: string;
  name: string;
  control: any;
  rules?: any;
  icon?: string;
  onIconPress?: () => void;
}
