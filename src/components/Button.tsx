import React from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';

export const Button = ({className, children, onPress}: ButtonProps) => {
  return (
    <Pressable
      className={`${className} flex w-full items-center py-4 rounded-full bg-sky-600 active:bg-sky-700`}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};

interface ButtonProps {
  className?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  children?: React.ReactNode;
}
