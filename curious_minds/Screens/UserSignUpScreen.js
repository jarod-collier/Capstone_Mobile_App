import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import { db } from '../FireDatabase/config';
import { useFocusEffect } from '@react-navigation/native';

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


const handleFirstName = text => {
  state.FirstName = text;
};
const handleLastName = text => {
  state.LastName = text;
};
const handleUsername = text => {
  state.Username = text;
};
const handlePassword = text => {
  state.Password = text;
};
const handleEmail = text => {
  state.Email = text;
};

const clearFirstName = React.createRef();
const clearLastName = React.createRef();
const clearUsername = React.createRef();
const clearPassword = React.createRef();
const clearEmail = React.createRef();

// useFocusEffect(
  //   React.useCallback(() => {
    //     // Do something when the screen is focused
    //     return () => {
      //       // Do something when the screen is unfocused
      //       clearFirstName.current.clear();
      //       clearLastName.current.clear();
      //       clearUsername.current.clear();
      //       clearPassword.current.clear();
      //       clearEmail.current.clear();
      //     };
      //   }, [])
      // );

export default class UserSignUpScreen extends Component {

  constructor() {
    super();
    this.state = {
      FirstName: '',
      LastName: '',
      Username: '',
      Password: '',
      Email: '',
    };
  }

  async handleSignUp(navigation){
    const valid = await this.checkUsername();
    if(valid){
      var UserId;
      firebase.auth()
      .createUserWithEmailAndPassword(state.Email, state.Password)
      .then(data => UserId = data.user.uid)
      .then(() => db.ref('/userInfo').push({
        First: "" + state.FirstName,
        Last: "" + state.LastName,
        Username: "" + state.Username,
        uid: UserId,
        postNum: 0,
        commentNum: 0,
        AddintionalInfo: "",
        score: 0,
        userType: "user"
      }).catch((error)=>{
        Alert.alert('error ', error)
      }))
      .then(() => navigation.reset({
        index: 0,
        routes: [{ name: 'Main'}],
      }))
      .catch(error => Alert.alert(error.message));
    }
  };

  async checkUsername(){
    let usernames = [];
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
        usernames.push(
          child.val().Username
        );
      })
    });
    if(usernames.includes(state.Username)){
      Alert.alert('username is already in use\nPlease try a different username');
      return false;
    }else{
      return true;
    }
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
          extraHeight={100}
        >
          <View style={styles.logo}>
            <Image source={require('../images/CM_logo02.png')} />
          </View>
          <View>
            <Text style={styles.infoHereText}>INFO HERE</Text>
          </View>
          <View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <TextInput
                style={styles.namesInput}
                placeholder="  FirstName"
                placeholderTextColor="black"
                onChangeText={e => {
                      this.setState({
                        FirstName: e,
                      });
                    }}
                ref={clearFirstName}
              />
              <TextInput
                style={styles.namesInput}
                placeholder="  LastName"
                placeholderTextColor="black"
                onChangeText={e => {
                      this.setState({
                        LastName: e,
                      });
                    }}
                ref={clearLastName}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <TextInput
                style={styles.inputBox}
                placeholder="  Username"
                placeholderTextColor="black"
                onChangeText={e => {
                      this.setState({
                        Username: e,
                      });
                    }}
                ref={clearUsername}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Password"
                secureTextEntry={true}
                autoCapitalize='none'
                placeholderTextColor="black"
                onChangeText={e => {
                      this.setState({
                        Password: e,
                      });
                    }}
                ref={clearPassword}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Email"
                keyboardType='email-address'
                placeholderTextColor="black"
                onChangeText={e => {
                      this.setState({
                        Email: e,
                      });
                    }}
                ref={clearEmail}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => this.handleSignUp(this.props.navigation)}>
              <Text style={styles.customBtnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
    marginBottom: 50,
  },
  namesInput: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 150,
    height: 40,
    textAlign: 'left',
    marginTop: 10,
    margin: 10,
  },
  inputBox: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
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
    // borderWidth: 1,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'center',
    // borderColor: 'white',
    borderRadius: 25,
    width: 250,
    marginTop: 15,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
  infoHereText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
});

// export default UserSignUpScreen;
