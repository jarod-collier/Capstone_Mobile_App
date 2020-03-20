import React, {Component, useCallback, useState} from 'react';
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
  RefreshControl,
  LayoutAnimation,
} from 'react-native';

var state = {
  events: [],
  display: [],
  canAdd: false,
  Loading: true,
};

const delay = ms => new Promise(res=>setTimeout(res,ms));

async function canAddEvent (){
  let uid = firebase.auth().currentUser.uid;
  // console.log("uid: " + uid);
  let userCan = false;
  let userType = "";
  await db.ref('userInfo').once('value', function(snapshot){
    snapshot.forEach((child) => {
      if(child.val().uid === uid){
        userType = child.val().userType;
        userCan = true;
      }
    });
  });
  // console.log(userType);
  state.canAdd = userCan;
  state.Loading = false;
  if(userType === "pastor") return true;
  else return false;
}

function EventScreen({navigation}) {
  const [isLoading, setLoading]= useState(true);
  const [addButton, setAddButton]= useState(false);
  const onRefresh = useCallback(() => {
    setLoading(true);
    delay(2000).then(()=> setLoading(false))}, [isLoading]
  );
  canAddEvent();
  LayoutAnimation.easeInEaseOut();
  return (
    setTimeout(()=> setLoading(state.Loading), 500),
    setTimeout(()=> setAddButton(state.canAdd), 500),
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      >
      <View style={styles.container}>
        { addButton && 
          <TouchableOpacity
            style={styles.Buttons}
            // onPress={() => }
          >
          <Text style={styles.customBtnText}>Add Event</Text>
          </TouchableOpacity>
        }
        </View>
        {/* <Modal
          transparent={true}
          animationType={'none'}
          visible={isLoading}
        >
          <ActivityIndicator size="large" color="black" style={{flex: 1}}/>
        </Modal> */}
      </ScrollView>
    </SafeAreaView>
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
