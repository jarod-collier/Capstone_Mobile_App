/******************************************************************************
 * Authors: Jarod Collier, Mazen Ashgar, and Brendan Cronan
 *
 * @format
 * @flow
 *****************************************************************************/
// import 'react-native-gesture-handler';
// import React, { Component } from 'react';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { db } from './FireDatabase/config';

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
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';

const Tab = createBottomTabNavigator();

console.ignoredYellowBox = [
  'Setting a timer'
]

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
        activeBackgroundColor: 'silver',
        inactiveBackgroundColor: 'dodgerblue',
        style: {
          backgroundColor: "dodgerblue"
        }
      }}
    >
      <Tab.Screen
        name="Main"
        component={Nested_Main}
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
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
}
const Nested_Stack = createStackNavigator();
function Nested_Main(){
  return (
    <Nested_Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'dodgerblue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerStatusBarHeight: 5,
      }}
    >
      <Nested_Stack.Screen
        name="Main Feed"
        component={MainFeedScreen}
        options={({ route }) => ({
          headerShown: false
        })}
      />
      <Nested_Stack.Screen
        name="Thread"
        component={ThreadScreen}
        options={({ route, navigation }) => ({
          headerTitle: "Thread",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.Buttons}
              onPress={()=> navigation.navigate("Main Feed")}>
              <Text style={styles.customBtnText}>Back</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Nested_Stack.Screen
        name="Add Event"
        component={NewEventScreen}
        options={({ route, navigation }) => ({
          headerTitle: "Add Event",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.Buttons}
              onPress={()=> navigation.navigate("Events")}>
              <Text style={styles.customBtnText}>Back</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Nested_Stack.Screen
        name="Reset Password"
        component={ResetPasswordScreen}
        options={({ route, navigation }) => ({
          headerTitle: "Reset Password",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.Buttons}
              onPress={()=> navigation.navigate("Profile")}>
              <Text style={styles.customBtnText}>Back</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Nested_Stack.Navigator>
  )
}
const delay = ms => new Promise(res=>setTimeout(res,ms));
function signOut(navigation){
  firebase.auth().signOut()
  .then(() => delay(500), navigation.reset({
    index: 0,
    routes: [{ name: 'Login'}],
  }))
  .catch(error => Alert.alert(error.message));
}
const Stack = createStackNavigator();
const MyTheme = {
  dark: false,
  colors: {
    primary: 'orange',
    background: 'silver',
    card: 'green',
    text: 'dodgerblue',
    // border: 'red',
  },
};

function AppContainer() {
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
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={({ navigation, route }) => ({
            headerTitle: <Image source={require('./images/CM_logo02_header.png')}/>,
            headerRight: () => (
              <TouchableOpacity
                style={styles.Buttons}
                onPress={()=> signOut(navigation)}>
                <Text style={styles.customBtnText}>Log Out</Text>
              </TouchableOpacity>
          ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  tabIcons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'dodgerblue',
  },
  logoutText: {
    // fontSize: 20,
    // fontWeight: '400',
    color: "black",
    textAlign: "center",
    marginHorizontal: 7
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 2, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    backgroundColor: 'silver',
    justifyContent: 'center',
    borderRadius: 25,
    width: 100,
    height: 30,
    marginVertical: 10,
    margin: 10
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
