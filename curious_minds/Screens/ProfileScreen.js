import React, {Component, useCallback, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { db } from '../FireDatabase/config';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  LayoutAnimation,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

var state= {
  username: '',
  email: '',
  aboutMe: '',
  fName: '',
  lName: '',
  Loading: true,
  pastorUser: false,
  preach: '',
  seminary: '',
  pastorCode: '',
};

const delay = ms => new Promise(res=>setTimeout(res,ms));

async function delUser(navigation){
  Alert.alert(
    'Delete Account',
    'Are you sure you want to delete your account?',
    [
      {text: 'Cancel', onPress: () => {}},
      {text: 'DELETE', onPress: async () => {
        var node;
        let uid = firebase.auth().currentUser.uid;
        await db.ref('/userInfo/').once('value', function(snapshot){
          snapshot.forEach((child) => {
            if(child.val().uid === uid){
              node = child.key;
            }
          })
        });
        await db.ref('/userInfo/').child(node).remove();
        delay(500);

        var user = firebase.auth().currentUser;
        user.delete().then(() => navigation.reset({
          index: 0,
          routes: [{ name: 'Login'}],
        }))
        .catch(error => Alert.alert(error.message));
      }, style: {color: 'red'}}
    ],
    {cancelable: true}
  )
}

async function getUserInfo(){
  state.Loading = true;
  let uid = firebase.auth().currentUser.uid;

  await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
          if(child.val().uid === uid){
            state.fName = child.val().First;
            state.lName = child.val().Last;
            state.email = firebase.auth().currentUser.email;
            state.username = child.val().Username;
            if(child.val().userType === 'pastor'){
              state.pastorUser = true;
              state.preach = child.val().Preach;
              state.seminary = child.val().Seminary;
              state.pastorCode = child.val().pastorCode;
            }
          }
      })
  });
  state.Loading = false;
}

function ProfileScreen({navigation}) {
  const [isLoading, setLoading]= useState(true);
  getUserInfo();
  LayoutAnimation.easeInEaseOut();
  return(
    setTimeout(()=> setLoading(state.Loading), 500),
   <View style={styles.container}>
     <View style={{flex:2, flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 3}}>
       {/* image view */}
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.image}
            onPress={()=> Alert.alert('Add')}
          >
            <Button
              style={{backgroundColor: '#A59F9F'}}
              color='white'
              name='user'
              size={35}
               />
          </TouchableOpacity>
          </View>
          {/* text view */}
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          {/*name line */}
          <View>
  <Text style={{fontSize: 34, fontWeight: 'bold', marginLeft: 10, marginBottom: 20, marginTop: 20}}>{state.fName} {state.lName}</Text>
          </View>
          {/*posts line */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, marginLeft: 10}}> Posts{'\n'}written</Text>
            <Text style={{fontSize: 18, marginLeft: 10}}>      Posts{'\n'}commented{'\n'}        on</Text>
            <Text style={{fontSize: 18, marginLeft: 10}}>{'\n'}Score</Text>
          </View>
          {/*numbers line */}
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 18, margin: 10, marginLeft: 30}}> 0</Text>
            <Text style={{fontSize: 18, margin: 10, marginLeft: 60}}> 0</Text>
            <Text style={{fontSize: 18, margin: 10, marginLeft: 60}}> 0</Text>
          </View>
        </View>
     </View>
     <View style={{flex:4}}>
       {/*about me section*/}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>About me</Text>
        <TouchableOpacity
            style={styles.Buttons}
            onPress={() => Alert.alert('Edit About me')}
        >
          <View>
            <Text style={styles.customBtnText}>Edit</Text>
          </View>
        </TouchableOpacity>
       </View>
       <Text style={{fontSize: 18, marginTop: 20, marginLeft: 20,}}>Here is about me</Text>
       {/*username line*/}
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 20, marginLeft: 20}}>Username</Text>
        <Text style={{fontSize: 18, marginTop: 20}}>    {state.username}</Text>
       </View>
       {/*email line*/}
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 20}}>Email</Text>
        <Text style={{fontSize: 18, marginTop: 20}}>              {state.email}</Text>
       </View>
       {/*password line*/}
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 20}}>Password</Text>
        <TouchableOpacity
            style={styles.Buttons}
            onPress={() => Alert.alert('reset password')}
        >
          <View>
            <Text style={styles.customBtnText}>Reset password</Text>
          </View>
        </TouchableOpacity>
       </View>
       { state.pastorUser &&
          <View>
            {/* Preach line */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 20}}>Preach</Text>
              <Text style={{fontSize: 18, marginTop: 20}}>           {state.preach}</Text>
            </View>
            {/* seminary line */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 20}}>Seminary</Text>
              <Text style={{fontSize: 18, marginTop: 20}}>         {state.seminary}</Text>
            </View>
            {/* pastor code line */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 20}}>Pastor code</Text>
              <Text style={{fontSize: 18, marginTop: 20, fontStyle: 'italic'}}>         {state.pastorCode}</Text>
            </View>

          </View>

       }
       {/** delete button */}
       <View style={{bottom: 0, position: 'absolute', justifyContent: 'center', alignSelf: 'center'}}>
       <TouchableOpacity
            style={styles.Delete}
            onPress={() => delUser(navigation)}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.customBtnText}>Delete Account</Text>
              <Button
                style={{backgroundColor: 'red'}}
                name="trash"
                color="black" />
            </View>
          </TouchableOpacity>
       </View>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
  },
  logo: {
    margin: 100,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A59F9F',
    width: 125,
    height: 125,
    borderRadius: 65,
    margin: 15,
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
  Delete: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'red',
    // flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'red',
    borderRadius: 10,
    width: 250,
    marginVertical: 15,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 2, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: '#B2ACAC',
    justifyContent: 'center',
    borderColor: '#B2ACAC',
    borderRadius: 10,
    height: 25,
    marginTop: 20,
    marginHorizontal: 20,
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
    // fontSize: 20,
    // fontWeight: '400',
    color: "black",
    textAlign: "center",
    marginHorizontal: 7
  },
  footer: {
    bottom: 0,
  },
});

export default ProfileScreen;
