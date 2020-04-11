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


var state = {
  Email: '',
};

var handleEmail = text => {
    state.Email = text;
};

var resetPassword = (navigation) => {
    if (state.Email != null) {
        firebase.auth().sendPasswordResetEmail(state.Email);
        Alert.alert(
            'Reset Password',
            'Your password has been reset.\nPlease check your email to finish the process.',
            [
              {text: 'OK', onPress: () => navigation.navigate('Login')},
            ],
            { cancelable: false }
          );
    }
    else {
        console.log("Please Enter Email.");
    }
};


function resetPasswordScreen({navigation}) {
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
            placeholder="Enter account email."
            placeholderTextColor="black"
            onChangeText={handleEmail}
          />
          <TouchableOpacity
              style={styles.Buttons}
              onPress={() => resetPassword(navigation)}>
              <Text style={styles.customBtnText}>Send Email</Text>
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

export default resetPasswordScreen;
