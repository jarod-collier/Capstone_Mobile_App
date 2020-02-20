import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
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
  Platform
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

function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
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
              <TouchableOpacity
                style={styles.Buttons}
                onPress={()=> navigation.navigate('User Type')}>
                <Text style={styles.customBtnText}>Log In</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={()=> navigation.navigate('New Post')}>
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
              onPress={() => navigation.navigate('User Type')}>
              <Text style={styles.customBtnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
    justifyContent: "space-evenly",
    padding: 10,
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
    marginBottom: 10
  },
  Buttons: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: {height: 3, width: 3}, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        borderWidth: 1,
        backgroundColor: 'green',
        borderColor:  'red',
        borderRadius: 50,
        width: 250,
        height: 10,
        margin: 5,
      },
      android: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: {height: 5, width: 5}, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android
        borderWidth: 1,
        backgroundColor: 'dodgerblue',
        justifyContent: 'center',
        borderColor: 'white',
        borderRadius: 25,
        width: 250,
        //margin: 10,
        marginVertical: 12,
      },
    }),
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});

export default LoginScreen;
