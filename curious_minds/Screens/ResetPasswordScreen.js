import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Alert } from 'react-native';
import React, {Component, useState} from 'react';
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

export default class ResetPasswordScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      errorCounter: 0,
    };
  }

  makeDelay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  resetPassword (navigation) {
    var user = firebase.auth().currentUser;

    if (this.state.oldPassword != null) {
      var credential = firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        this.state.oldPassword
      );

      user.reauthenticateWithCredential(credential).then(function(){
        //user re-authenticated
        if(this.state.newPassword1 != null && this.state.newPassword2 != null){
          //passwords exist
          if(this.state.newPassword1.length >= 6 && this.state.newPassword2.length >= 6){
          //password longer than 6 characters
            if(this.state.newPassword1 === this.state.newPassword2){
              //passwords match
              firebase.auth().currentUser.updatePassword(this.state.newPassword1).then(function(){
                Alert.alert("Your password has been reset");
                //reset credential and re-authenticate user session
                credential = firebase.auth.EmailAuthProvider.credential(
                  firebase.auth().currentUser.email,
                  this.state.newPassword1
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
      }.bind(this)).catch(function(error){
        //error authenticating
        this.state.errorCounter++;
        if(this.state.errorCounter < 5){
          Alert.alert('Old password is incorrect\nYou have ' + (5 - this.state.errorCounter) + ' attempts left');
        }else{
          Alert.alert('You have exceeded the trail limit.\nYou will be signed out now.')
          firebase.auth().signOut()
          .then(() => this.makeDelay(500), navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}],
            }))
          .catch(error => Alert.alert(error.message));
        }
      }.bind(this))
    }
    else {
        Alert.alert("Please Enter old password");
    }
  };

  render() {
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
              onChangeText={e => {
                    this.setState({
                      oldPassword: e,
                    });
                  }}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Enter new password*"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={e => {
                    this.setState({
                      newPassword1: e,
                    });
                  }}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Enter new password again*"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={e => {
                    this.setState({
                      newPassword2: e,
                    });
                  }}
            />
            <Text style={{fontStyle:'italic', textAlign: 'center'}}>* New password needs to be at least {'\n'}6 characters long</Text>
            <TouchableOpacity
                style={styles.Buttons}
                onPress={async () => {this.resetPassword(this.props.navigation); this.props.navigation.navigate('Main')}}>
                <Text style={styles.customBtnText}>Reset Password</Text>
              </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
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

// export default ResetPasswordScreen;
