import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Alert } from 'react-native';
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

const delay = ms => new Promise(res=>setTimeout(res,ms));

var state = {
  oldPassword: '',
  newPassword1: '',
  newPassword2: '',
  errorCounter: 0,
};

var handleOldPassword = text => {
    state.oldPassword = text;
};

var handleNewPassword1 = text => {
  state.newPassword1 = text;
};

var handleNewPassword2 = text => {
  state.newPassword2 = text;
};

function resetPassword (navigation) {
  var user = firebase.auth().currentUser;
  
    if (state.oldPassword != null) {
      var credential = firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        state.oldPassword
      );

      user.reauthenticateWithCredential(credential).then(function(){
        //user re-authenticated
        if(state.newPassword1 != null && state.newPassword2 != null){
          //passwords exist
          if(state.newPassword1.length >= 6 && state.newPassword2.length >= 6){
          //password longer than 6 characters
            if(state.newPassword1 === state.newPassword2){
              //passwords match
              firebase.auth().currentUser.updatePassword(state.newPassword1).then(function(){
                Alert.alert("Your password has been reset");
                //reset credential and re-authenticate user session
                credential = firebase.auth.EmailAuthProvider.credential(
                  firebase.auth().currentUser.email,
                  state.newPassword1
                );
                user.reauthenticateWithCredential(credential);
              })   
            }else{
              //passwords dont match
              Alert.alert('New passwords don\'t match');
            }
          }else{
            //new passwords less than 6 characters
            Alert.alert('New password needs to be at least 6 characters long')
          }
        }else{
          //empty new password
          Alert.alert('Please fill all fields');
        }
      }).catch(function(error){
        //error authenticating
        state.errorCounter++;
        if(state.errorCounter < 5){
          Alert.alert('Old password is incorrect\nYou have ' + (5 - state.errorCounter) + ' attempts left');
        }else{
          Alert.alert('You have exceeded the trail limit.\nYou will be signed out now.')
          firebase.auth().signOut()
          .then(() => delay(500), navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}],
            }))
          .catch(error => Alert.alert(error.message));
        }
      })
    }
    else {
        Alert.alert("Please Enter old password");
    }
};


function ResetPasswordScreen({navigation}) {
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
            placeholder="Enter old password"
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={handleOldPassword}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter new password*"
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={handleNewPassword1}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Enter new password again*"
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={handleNewPassword2}
          />
          <Text style={{fontStyle:'italic', textAlign: 'center'}}>* New password needs to be at least {'\n'}6 characters long</Text>
          <TouchableOpacity
              style={styles.Buttons}
              onPress={async () => {resetPassword(navigation); navigation.navigate('Main')}}>
              <Text style={styles.customBtnText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
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
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 250,
    textAlign: 'center',
    padding: 8,
    marginVertical: 10
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
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

export default ResetPasswordScreen;
