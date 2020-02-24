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

function PastorSignUpScreen({navigation}) {
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
                onChangeText={this.handleFirstName}
              />
              <TextInput
                style={styles.namesInput}
                placeholder="  LastName"
                placeholderTextColor="white"
                onChangeText={this.handleLastName}
              />
            </View>
            <View style={{flexDirection: 'column'}}>
              <TextInput
                style={styles.inputBox}
                placeholder="  Username"
                placeholderTextColor="white"
                onChangeText={this.handleUsername}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Password"
                secureTextEntry={true}
                placeholderTextColor="white"
                onChangeText={this.handlePassword}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Email"
                placeholderTextColor="white"
                onChangeText={this.handleEmail}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Church preaching at"
                placeholderTextColor="white"
                onChangeText={this.handlePreach}
              />
              <TextInput
                style={styles.inputBox}
                placeholder="  Where did you attend Seminary?"
                placeholderTextColor="white"
                onChangeText={this.handleSeminary}
              />
              <TextInput
                style={styles.multiline}
                placeholder="  Any additional information you would like to share"
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={10}
                onChangeText={this.handleAdditionalInfo}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => navigation.navigate('Login')}>
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

export default PastorSignUpScreen;
