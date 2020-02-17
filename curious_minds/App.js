/******************************************************************************
 * Authors: Jarod Collier, Mazen Ashgar, and Brendan Cronan
 *
 * @format
 * @flow
 *****************************************************************************/
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from 'react-native';

import LoginScreen from './Screens/LoginScreen';
import UserTypeScreen from './Screens/UserTypeScreen';
import PastorSecCodeScreen from './Screens/PastorSecCodeScreen';
import UserSignUpScreen from './Screens/UserSignUpScreen';
import PastorSignUpScreen from './Screens/PastorSignUpScreen';
import NewPostScreen from './Screens/NewPostScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="User Type" component={UserTypeScreen} />
        <Stack.Screen name="Security Code" component={PastorSecCodeScreen} />
        <Stack.Screen name="Pastor SignUp" component={PastorSignUpScreen} />
        <Stack.Screen name="User SignUp" component={UserSignUpScreen} />
        <Stack.Screen name="New Post" component={NewPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
