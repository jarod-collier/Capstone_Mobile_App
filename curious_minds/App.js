/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';

//import FetchLocation from './components/FetchLocation';
import LoginScreen from './Screens/LoginScreen';

const App: () => React$Node = () => {
  return <LoginScreen />;
};

const styles = StyleSheet.create({});

export default App;
