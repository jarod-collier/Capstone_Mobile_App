import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';

import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';


this.state = {
  Username: '',
  Password: '',
};

this.handleUsername = text => {
  this.state.Username = text;
};

this.handlePassword = text => {
  this.state.Password = text;
};

this.checkUserInitials = () => {
  console.log(this.state.Username);
  console.log(this.state.Password);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
  },
  logo: {
    margin: 100,
  },
  inputBox: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    width: 250,
    textAlign: 'center',
    padding: 10,
    margin: 5,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'white',
    borderRadius: 50,
    width: 250,
    margin: 5,
    marginTop: 35,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
});

function LoginScreen({navigation}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../images/logo_placeholder.png')} />
        </View>
        <View>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter your Username"
            placeholderTextColor="white"
            onChangeText={this.handleUsername}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={this.handlePassword}
          />
          <View>
            <TouchableOpacity style={styles.Buttons}>
              <Button
                title="Log In"
                color="white"
                onPress={this.checkUserInitials}
              />
            </TouchableOpacity>
            <Button
              style={styles.forget}
              title="Forgot Password?"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Don't have an account yet? </Text>
          <Button
            title="Sign up"
            // onPress={() => navigation.navigate('UserTypeScreen')}
            onPress={()=> navigation.navigate('New Post')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
