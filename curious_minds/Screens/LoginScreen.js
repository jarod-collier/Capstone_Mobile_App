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
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';


this.state = {
  Username: '',
  Password: '',
};

this.handleUsername = text => {
  this.state.Username = text;
};

this.handlePassword = text => {
  this.state.Password = text;
};

this.checkCredentials = () => {
  //if no credentials, send to sign up screen.
  if (this.state.Username == null || this.state.Password == null) {
    console.log("no username or password");
    return false;
  }
  //TODO: make this a regexp check for email?
  else if (!this.state.Username.includes("@") || !this.state.Username.includes(".com") ){
    console.log("Improper username format");
    return false;
  }
  else {
    return true;
  }
};

this.logInUser = () => {
  if(this.checkCredentials()){
    firebase.auth().signInWithEmailAndPassword(this.state.Username, this.state.Password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
      if (errorCode == "auth/user-not-found"){//user doesn't exist
        //navigation.navigate('User Type');  //Don't know why this doesn't work.
        console.log("No user found.  Please sign in.")
      }

      // ...
    });
  }
  else {
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
      //navigation.navigate('New Post'); //Don't know why this doesn't work.

      // ...
    });
  }

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
      // ...
    } else {
      console.log("no user found");
      // User is signed out.
      // ...
    }
  });

};

function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={require('../images/logo_placeholder.png')} />
          </View>
          <View>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter your Username"
              placeholderTextColor="white"
              onChangeText={this.handleUsername}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={true}
              onChangeText={this.handlePassword}
            />
            <View>
              <TouchableOpacity
                style={styles.Buttons}
                // onPress={()=> this.logInUser() }>
                onPress={() => navigation.navigate('Main Feed')}>
                <Text style={styles.customBtnText}>Log In</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => navigation.navigate('New Post')}>
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
    margin: 100,
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
