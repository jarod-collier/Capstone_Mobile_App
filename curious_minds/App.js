/******************************************************************************
 * Authors: Jarod Collier, Mazen Ashgar, and Brendan Cronan
 *
 * @format
 * @flow
 *****************************************************************************/
// import 'react-native-gesture-handler';
// import React, { Component } from 'react';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { Image, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './Screens/LoginScreen';
import UserTypeScreen from './Screens/UserTypeScreen';
import PastorSecCodeScreen from './Screens/PastorSecCodeScreen';
import UserSignUpScreen from './Screens/UserSignUpScreen';
import PastorSignUpScreen from './Screens/PastorSignUpScreen';
import MainFeedScreen from './Screens/MainFeedScreen';
import NewPostScreen from './Screens/NewPostScreen';
import EventScreen from './Screens/EventScreen';
import ProfileScreen from './Screens/ProfileScreen';


const styles = StyleSheet.create({
  tabIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const Tab = createBottomTabNavigator();

type Props = {};
function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Main') {
            return (
              <View style={styles.tabIcons}>
                <Icon name="home" size={30} color="black" />
              </View>
            );
          } else if (route.name === 'Post') {
            return (
              <View style={styles.tabIcons}>
                <Icon name="plus" size={30} color="black" />
              </View>
            );
          } else if (route.name === 'Events') {
            return (
              <View style={styles.tabIcons}>
                <Icon name="calendar" size={30} color="black" />
              </View>
            );
          } else if (route.name === 'Profile') {
            return (
              <View style={styles.tabIcons}>
                <Icon name="user" size={30} color="black" />
              </View>
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'dodgerblue',
        inactiveTintColor: 'black',
      }}
    >
      <Tab.Screen name="Main" component={MainFeedScreen} />
      <Tab.Screen name="Post" component={NewPostScreen} />
      <Tab.Screen name="Events" component={PastorSecCodeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

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
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
