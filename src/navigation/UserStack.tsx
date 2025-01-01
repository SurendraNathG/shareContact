import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {StatusBar} from 'react-native';
import colors from '../global/colors';
import screenNames from '../global/screenNames';
import OtpVerification from '../screens/OtpVerification';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  autoHideHomeIndicator: true,
  navigationBarHidden: true,
  freezeOnBlur: true,
  animation: 'none',
};

function UserStack() {
  return (
    <NavigationContainer>
      <StatusBar
        animated
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <Stack.Navigator
        initialRouteName={screenNames.login}
        screenOptions={screenOptions}>
        <Stack.Screen name={screenNames.login} component={Login} />
        <Stack.Screen
          name={screenNames.otpVerification}
          component={OtpVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default memo(UserStack);
