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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="UserTypeScreen" component={UserTypeScreen} />
        <Stack.Screen name="PastorSecCodeScreen" component={PastorSecCodeScreen} />
        <Stack.Screen name="PastorSignUpScreen" component={PastorSignUpScreen} />
        <Stack.Screen name="UserSignUpScreen" component={UserSignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
