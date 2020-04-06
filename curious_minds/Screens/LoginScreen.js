import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  LayoutAnimation,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';


var state = {
  Username: '',
  Password: '',
};

var handleUsername = text => {
  state.Username = text;
};

var handlePassword = text => {
  state.Password = text;
};

var logInUser = (navigation) => {
    global.user = null;
    firebase.auth().signInWithEmailAndPassword(state.Username, state.Password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
      if (errorCode == "auth/user-not-found"){//user doesn't exist
        console.log("No user found.  Please sign in.")
      }
    });


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User is signed in.");
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      global.user = user;

      //navigate to new post screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main'}],
      });
      // ...
    } else {
      console.log("no user found");
      // User is signed out.
      // ...
    }
  });

};

function LoginScreen({navigation}) {
  firebase.auth().signOut();
  LayoutAnimation.easeInEaseOut();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../images/CM_logo02.png')}/>
        </View>
        <View>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter your Username"
            placeholderTextColor="white"
            onChangeText={handleUsername}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={handlePassword}
          />
          <View>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={()=> logInUser(navigation) }>
              {/* // onPress={()=> navigation.navigate('Main')}> */}
              <Text style={styles.customBtnText}>Log In</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={styles.customBtnText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={styles.customBtnText}>
            Don't have an account yet?
          </Text>
          <TouchableOpacity
            style={styles.Buttons}
            onPress={()=> navigation.navigate('User Type')}>
            <Text style={styles.customBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
    justifyContent: "space-evenly",
    padding: 10,
  },
  logo: {
    marginTop: 50,
    marginBottom: 30,
  },
  inputBox: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    width: 250,
    textAlign: 'center',
    padding: 8,
    marginVertical: 10
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 5, width: 5}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 250,
    height: 30,
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});

export default LoginScreen;
