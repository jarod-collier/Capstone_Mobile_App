import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class UserSignUpScreen extends Component {
  state = {
    FirstName: '',
    LastName: '',
    Username: '',
    Password: '',
    Email: '',
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

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Button title="Back" style={{}}/>  TODO: ADD BACK BUTTON*/}
          <View style={styles.logo}>
            <Image source={require('../images/logo_placeholder.png')} />
          </View>
          <View>
            <Text style={{fontSize: 24, textAlign: 'center'}}>
              INFO{'\n'}HERE
            </Text>
          </View>
          <View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <TextInput
                style={styles.namesInput}
                placeholder="FirstName"
                placeholderTextColor="white"
                onChangeText={this.handleFirstName}
              />
              <TextInput
                style={styles.namesInput}
                placeholder="LastName"
                placeholderTextColor="white"
                onChangeText={this.handleLastName}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <TextInput
                style={styles.inputBox}
                placeholder="Username"
                placeholderTextColor="white"
                onChangeText={this.handleUsername}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="white"
                onChangeText={this.handlePassword}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="Email"
                placeholderTextColor="white"
                onChangeText={this.handleEmail}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.Buttons}>
              <Button title="Sign Up" /*Add on press*/ />
            </TouchableOpacity>
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
    marginTop: 100,
    marginBottom: 70,
  },
  namesInput: {
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    width: 150,
    height: 40,
    textAlign: 'center',
    marginTop: 10,
    margin: 10,
  },
  inputBox: {
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    width: 320,
    height: 40,
    textAlign: 'center',
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
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 250,
    marginTop: 30,
  },
});
