import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
} from 'react-native';

state = {
  FirstName: '',
  LastName: '',
  Username: '',
  Password: '',
  Email: '',
  preach: '',
  seminary: '',
  addintionalInfo: '',
};
handleFirstName = text => {
  this.state.FirstName = text;
};
handleLastName = text => {
  this.state.LastName = text;
};
handleUsername = text => {
  this.state.Username = text;
};
handlePassword = text => {
  this.state.Password = text;
};
handleEmail = text => {
  this.state.Email = text;
};
handlePreach = text => {
  this.state.preach = text;
};
handleSeminary = text => {
  this.state.seminary = text;
};
handleAdditionalInfo = text => {
  this.state.addintionalInfo = text;
};

function MainFeedScreen({navigation}) {
  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text>MainFeedScreen!</Text>
   </View>
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

export default MainFeedScreen;
