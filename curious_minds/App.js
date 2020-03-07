/******************************************************************************
 * Authors: Jarod Collier, Mazen Ashgar, and Brendan Cronan
 *
 * @format
 * @flow
 *****************************************************************************/
// import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './Screens/LoginScreen';
import UserTypeScreen from './Screens/UserTypeScreen';
import PastorSecCodeScreen from './Screens/PastorSecCodeScreen';
import UserSignUpScreen from './Screens/UserSignUpScreen';
import PastorSignUpScreen from './Screens/PastorSignUpScreen';
import NewPostScreen from './Screens/NewPostScreen';

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
export default function App() {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Main" component={LoginScreen} />
        <Tab.Screen name="Post" component={UserTypeScreen} />
        <Tab.Screen name="Events" component={PastorSecCodeScreen} />
        <Tab.Screen name="Profile" component={NewPostScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
