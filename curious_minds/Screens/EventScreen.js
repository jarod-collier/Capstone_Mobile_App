import React, {Component, useState} from 'react';
import 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import {AnimatedEllipsis} from 'react-native-animated-ellipsis';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  LayoutAnimation,
} from 'react-native';

var state = {
  events: [],
  display: [],
  Loading: true,
};

const delay = ms => new Promise(res=>setTimeout(res,ms));

function canAddEvent (){
  let uid = firebase.auth().currentUser.uid;
  let canAdd = false;
  let userType = "";
  db.ref('userInfo').once('value', function(snapshot){
    snapshot.forEach((child) => {
      if(uid === child.val().uid){
        userType = child.val.userType;
        break;
      }
    })
  });

  if(userType === "pastor") return true;
  else return false;
}

function EventScreen({navigation}) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  return (
   <View style={styles.container}>
     if(canAddEvent()){
      <TouchableOpacity
        style={styles.Buttons}
        // onPress={() => }
      >
      <Text style={styles.customBtnText}>Add Event</Text>
      </TouchableOpacity>
    }x
   </View>
 );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
  },
  logo: {
    margin: 100,
  },
  inputBox: {
    alignItems:'stretch',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    textAlign: 'left',
    padding: 10,
    margin: 15,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderRadius: 15,
    height: 40,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
    height: 150,
    textAlign: 'left',
    margin: 15,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  footer: {
    bottom: 0,
  },
});
export default EventScreen;
