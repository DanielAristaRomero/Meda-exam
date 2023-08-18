import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {AuthContext} from '../../context';
import {ButtonLogout} from '../../components';

export const EmployeeDetail = () => {
  const {fullName} = useContext(AuthContext);
  return (
    <SafeAreaView>
      <ButtonLogout />
      <Text className="text-gray-700 text-center text-2xl mt-24">
        {fullName}
      </Text>
    </SafeAreaView>
  );
};
