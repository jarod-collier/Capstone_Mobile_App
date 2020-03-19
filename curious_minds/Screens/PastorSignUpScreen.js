import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import { db } from '../FireDatabase/config';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  LayoutAnimation,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

var state = {
  FirstName: '',
  LastName: '',
  Username: '',
  Password: '',
  Email: '',
  preach: '',
  seminary: '',
  addintionalInfo: '',
};
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
var handlePreach = text => {
  state.preach = text;
};
var handleSeminary = text => {
  state.seminary = text;
};
var handleAdditionalInfo = text => {
  state.addintionalInfo = text;
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
    Preach: "" + state.preach,
    Seminary: "" + state.seminary,
    AddintionalInfo: "" + state.AddintionalInfo,
    pastorCode: "" + (Math.random().toString(16).substring(2, 6) + Math.random().toString(16).substring(2, 6)),
    uid: UserId,
    userType: "pastor"
  }).catch((error)=>{
    Alert.alert('error ', error)
  }))
  .then(() => navigation.navigate('Main'))
  .catch(error => Alert.alert(error.message));
};

function PastorSignUpScreen({navigation}) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <KeyboardAwareScrollView
         resetScrollToCoords={{x: 0, y: 0}}
         contentContainerStyle={styles.container}
         scrollEnabled={false}
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
              <TextInput
                style={styles.inputBox}
                placeholder="  Church preaching at"
                placeholderTextColor="white"
                onChangeText={handlePreach}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Where did you attend Seminary?"
                placeholderTextColor="white"
                onChangeText={handleSeminary}
              />
              <TextInput
                style={styles.multiline}
                placeholder="  Any additional information you would like to share"
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={10}
                onChangeText={handleAdditionalInfo}
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
      </ScrollView>
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
    marginBottom: 70,
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
    textAlign: 'left',
    marginTop: 10,
    margin: 10,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    width: 320,
    height: 100,
    textAlign: 'left',
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
    marginVertical: 15,
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

export default PastorSignUpScreen;
