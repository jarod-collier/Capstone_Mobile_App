import React, {Component} from 'react';
// eslint-disable-next-line prettier/prettier
import {SafeAreaView ,StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image} from 'react-native';
// import 'react-native-gesture-handler';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import UserTypeScreen from './UserTypeScreen';

export default class LoginScreen extends Component {
  state = {
    Username: '',
    Password: '',
  };

  handleUsername = text => {
    this.state.Username = text;
  };

  handlePassword = text => {
    this.state.Password = text;
  };

  checkUserInitials = () => {
    console.log(this.state.Username);
    console.log(this.state.Password);
  };

  render() {
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
                /*TODO: add on pressed here*/
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Text>Don't have an account yet? </Text>
            <Button title="Sign up" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
