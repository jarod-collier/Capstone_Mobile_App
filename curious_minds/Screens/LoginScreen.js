import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import firebase from 'firebase';
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
  Platform,
  Alert
} from 'react-native';

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
    shadowOffset: {height: 5, width: 5}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
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
    color: "black",
    textAlign: "center"
  },
});


const handleUsername = text => {
  state.Username = text;
};

const handlePassword = text => {
  state.Password = text;
};

const logInUser = (navigation) => {
  global.user = null;
  firebase.auth().signInWithEmailAndPassword(state.Username, state.Password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    Alert.alert(errorCode + ": " + errorMessage);
    if (errorCode == "auth/user-not-found"){//user doesn't exist
      Alert.alert('Incorrect username/password\nPlease try again');
    }
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      global.user = user;
      //navigate to Main screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main'}],
      });
    }
  });
};

const clearUsername = React.createRef();
const clearPassword = React.createRef();

firebase.auth().signOut();
// useFocusEffect(
//   React.useCallback(() => {
//     // Do something when the screen is focused
//     return () => {
//       // Do something when the screen is unfocused
//       clearUsername.current.clear();
//       clearPassword.current.clear();
//     };
//   }, [])
// );

export default class LoginScreen extends Component {

  state = {
    Username: '',
    Password: '',
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
              placeholder="Enter your Email"
              keyboardType='email-address'
              placeholderTextColor="black"
              onChangeText={handleUsername}
              ref={clearUsername}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeText={handlePassword}
              ref={clearPassword}
            />
            <View>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={()=> logInUser(this.props.navigation) }>
                <Text style={styles.customBtnText}>Log In</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => this.props.navigation.navigate('Forgot Password')}>
                <Text style={styles.customBtnText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              style={styles.customBtnText}>
              Don't have an account yet?
            </Text>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={()=> this.props.navigation.navigate('User Type')}>
              <Text style={styles.customBtnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}


// export default LoginScreen;
