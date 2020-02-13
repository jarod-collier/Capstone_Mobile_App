import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from 'react-native';

function UserTypeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* <Button title="Back" style={{}}/>  TODO: ADD BACK BUTTON*/}
        <View style={styles.logo}>
          <Image source={require('../images/logo_placeholder.png')} />
        </View>
        <View>
          <Text style={{fontSize: 48, textAlign: 'center'}}>I AM</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.Buttons}>
            <Button
              title="A Pastor"
              onPress={() => navigation.navigate('PastorSecCodeScreen')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Buttons}>
            <Button
              title="A User"
              onPress={() => navigation.navigate('UserSignUpScreen')}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    margin: 100,
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
    width: 150,
    height: 150,
    margin: 10,
    marginTop: 50,
  },
});

export default UserTypeScreen;
