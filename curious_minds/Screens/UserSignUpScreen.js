import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
<<<<<<< HEAD
import firebase from 'firebase';
import { db } from '../FireDatabase/config';
=======
import { db } from '../FireDatabase/config';
import firebase from 'firebase';
>>>>>>> ef68077341688750bc522d61a743f35dfb341f89

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
  Alert,
} from 'react-native';

var state = {
  FirstName: '',
  LastName: '',
  Username: '',
  Password: '',
  Email: '',
};
// There has to be something in this last string otherwise a classic undefined is not an object. no idea why
// looks like if you refresh the whole thing then it works fine. Once you try to update
// this specific page while editing it then it gets wonky

var handleFirstName = text => {
  state.FirstName = text;
};
var handleLastName = text => {
  state.LastName = text;
};
var handleUsername = text => {
  state.Username = text;
};
var handlePassword = text => {
  state.Password = text;
};
var handleEmail = text => {
  state.Email = text;
};

function handleSignUp(navigation){

  var UserId;
  firebase.auth()
  .createUserWithEmailAndPassword(state.Email, state.Password)
  .then(data => UserId = data.user.uid)
  .then(() => db.ref('/userInfo').push({
    First: "" + state.FirstName,
    Last: "" + state.LastName,
    Username: "" + state.Username,
    uid: UserId,
    userType: "user"
  }).catch((error)=>{
    Alert.alert('error ', error)
  }))
  .then(() => navigation.navigate('Main'))
  .catch(error => Alert.alert(error.message));
};

function UserSignUpScreen({navigation}) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
         resetScrollToCoords={{x: 0, y: 0}}
         contentContainerStyle={styles.container}
         scrollEnabled={false}
         extraHeight={100}
        >
          <View style={styles.logo}>
            <Image source={require('../images/logo_placeholder.png')} />
          </View>
          <View>
            <Text style={styles.infoHereText}>INFO HERE</Text>
          </View>
          <View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <TextInput
                style={styles.namesInput}
                placeholder="  FirstName"
                placeholderTextColor="white"
                onChangeText={handleFirstName}
              />
              <TextInput
                style={styles.namesInput}
                placeholder="  LastName"
                placeholderTextColor="white"
                onChangeText={handleLastName}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <TextInput
                style={styles.inputBox}
                placeholder="  Username"
                placeholderTextColor="white"
                onChangeText={handleUsername}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Password"
                secureTextEntry={true}
                placeholderTextColor="white"
                onChangeText={handlePassword}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Email"
                placeholderTextColor="white"
                onChangeText={handleEmail}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => handleSignUp(navigation)}>
              <Text style={styles.customBtnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
    marginBottom: 50,
  },
  namesInput: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    width: 150,
    height: 40,
    textAlign: 'left',
    marginTop: 10,
    margin: 10,
  },
  inputBox: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    width: 320,
    height: 40,
    // textAlign: 'center',
    marginTop: 10,
    margin: 10,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 5, width: 5}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 250,
    marginTop: 15,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  infoHereText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});

export default UserSignUpScreen;
