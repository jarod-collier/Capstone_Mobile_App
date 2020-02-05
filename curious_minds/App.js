/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';

// import 'react-native-gesture-handler';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './Screens/LoginScreen';
import UserTypeScreen from './Screens/UserTypeScreen';
import PastorSecCode from './Screens/PastorSecCodeScreen';

// const RootStack = createStackNavigator(
//   {
//     LoginScreen: LoginScreen,
//     UserTypeScreen: UserTypeScreen,
//   },
//   {
//     initialRouteName: 'LoginScreen',
//   },
// );

// const AppContainer = createAppContainer(RootStack);

// export default class App extends React.Component {
//   render() {
//     return <LoginScreen />;
//   }
// }

const App: () => React$Node = () => {
  return (
    // <LoginScreen />
    // <UserTypeScreen />
    <PastorSecCode />
  );
};

const styles = StyleSheet.create({});

export default App;
