import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/home';
import {AddUser, CompanyLogin, UsersList} from '../screens/company';
import {EmployeeDetail, EmployeeLogin} from '../screens/employee';
import {Posts} from '../screens/posts';
import {AuthContext} from '../context';

const Stack = createStackNavigator();

export const Navigation = () => {
  const {isAuth, role} = useContext(AuthContext);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'rgb(248 250 252)',
        },
        headerShown: false,
      }}>
      {!isAuth ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CompanyLogin" component={CompanyLogin} />
          <Stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
          <Stack.Screen name="Posts" component={Posts} />
        </>
      ) : role === 'ADMIN' ? (
        <>
          <Stack.Screen name="UsersList" component={UsersList} />
          <Stack.Screen name="AddUser" component={AddUser} />
        </>
      ) : (
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetail} />
      )}
    </Stack.Navigator>
  );
};
