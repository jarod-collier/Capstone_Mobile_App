/******************************************************************************
 * Authors: Jarod Collier, Mazen Ashgar, and Brendan Cronan
 *
 * @format
 * @flow
 *****************************************************************************/
// import 'react-native-gesture-handler';
// import React, { Component } from 'react';
import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
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
import NewEventScreen from './Screens/NewEventScreen';
import ThreadScreen from './Screens/ThreadScreen';


const styles = StyleSheet.create({
  tabIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const Tab = createBottomTabNavigator();

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
      <Tab.Screen
        name="Main"
        component={MainFeedScreen}
        options={{
          tabBarLabel: 'Home',
        }} />
      <Tab.Screen
        name="Post"
        component={NewPostScreen}
        options={{
          tabBarLabel: 'Post',
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarLabel: 'Events',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home'

  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Profile':
      return 'Profile'
    case 'Events':
      return 'Events'
    case 'Post':
      return 'Post'
  }
}
const Stack = createStackNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: '#696969',
    card: 'rgb(255, 255, 255)',
    text: 'dodgerblue',
    border: 'rgb(199, 199, 204)',
  },
};

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'dodgerblue',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="User Type" component={UserTypeScreen} />
        <Stack.Screen name="Thread" component={ThreadScreen} />
        <Stack.Screen name="Security Code" component={PastorSecCodeScreen} />
        <Stack.Screen name="Pastor SignUp" component={PastorSignUpScreen} />
        <Stack.Screen name="User SignUp" component={UserSignUpScreen} />
        <Stack.Screen name="Add Event" component={NewEventScreen} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route)
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
