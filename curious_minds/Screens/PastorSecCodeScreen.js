import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { db } from '../FireDatabase/config';
import {
  SafeAreaView,
  StyleSheet,
  View,
  LayoutAnimation,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

export default class PastorSecCodeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Code: "",
    };
    this.clearCode = React.createRef();
  }

  async readFromDB(){
    let found = false;
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
        if(child.val().userType === 'pastor'){
          if(child.val().pastorCode === this.state.Code){
            found = true;
          }
        }
      })
    }.bind(this));
    return found;
  }

  async validateCode(navigation){
    var valid = await this.readFromDB();
    if(valid){
      navigation.navigate('Pastor SignUp');
    }else{
      Alert.alert('Not a valid security code\nPlease try again');
    }
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
         style={styles.container}
         behavior="position"
         >
          <View style={styles.logo}>
            <Image source={require('../images/CM_logo02.png')} />
          </View>
          <View>
            <Text style={styles.securityCodeText}>Pastors{"\n"}Security Code*</Text>
            <Text style={{marginHorizontal: 80, marginTop: 20,textAlign: 'center'}}>
              *Pastors can only sign-up using a security code from a pastor that is already signed up.
              {'\n\n'}Security code can be found on pastor profile screen
            </Text>
          </View>
          <View style = {{alignItems: 'center'}}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Code Here"
              placeholderTextColor="black"
              onChangeText={e => {this.setState({Code: e});}}
              ref={this.clearCode}
            />
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => this.validateCode(this.props.navigation)}>
              <Text style={styles.customBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    marginHorizontal: 100,
    marginTop: 100,
    marginBottom:50,
  },
  inputBox: {
    borderBottomWidth: 1.0,
    width: 250,
    textAlign: 'center',
    marginTop: 50,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 25,
    width: 150,
    marginTop: 25,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
  securityCodeText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
});
