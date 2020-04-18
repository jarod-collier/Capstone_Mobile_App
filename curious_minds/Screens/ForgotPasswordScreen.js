import 'react-native-gesture-handler';
import { Alert } from 'react-native';
import React, {Component} from 'react';
import firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  LayoutAnimation,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class ForgotPasswordScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      Email: ''
    };
  }

resetPassword (navigation){
  if (this.state.Email != '') {
    firebase.auth().sendPasswordResetEmail(this.state.Email);
    Alert.alert(
      'Reset Password',
      'Your password has been reset.\nPlease check your email to finish the process',
      [
        {text: 'OK', onPress: () => navigation.navigate('Login')},
      ],
      { cancelable: false }
    );
  }
  else {
    console.log("Please enter a valid email");
  }
};

  render(){
    LayoutAnimation.easeInEaseOut();
    return(
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
          extraHeight={100}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.logo}>
            <Image source={require('../images/CM_logo02.png')}/>
          </View>
          <View>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter account email."
              placeholderTextColor="black"
              returnKeyType='done'
              onChangeText={ e => this.setState({Email: e})}
            />
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => this.resetPassword(this.props.navigation)}>
              <Text style={styles.customBtnText}>Send Email</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: "space-evenly",
    padding: 10,
  },
  logo: {
    marginHorizontal: 100,
    marginTop: 100,
    marginBottom:50,
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
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 250,
    height: 30,
    marginVertical: 10,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});
