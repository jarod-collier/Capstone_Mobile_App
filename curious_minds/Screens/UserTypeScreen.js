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
  LayoutAnimation,
  Button,
  Alert,
  Platform,
} from 'react-native';

function UserTypeScreen({navigation}) {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../images/CM_logo02.png')} />
        </View>
        <View>
          <Text style={styles.iAmText}>INFO HERE</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.Buttons}
            onPress={() => navigation.navigate('Security Code')}>
            <Text style={styles.customBtnText}>A Pastor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Buttons}
            onPress={() => navigation.navigate('User SignUp')}>
            <Text style={styles.customBtnText}>A User</Text>
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
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 150,
    height: 150,
    margin: 10,
    marginTop: 50,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  iAmText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});

export default UserTypeScreen;
