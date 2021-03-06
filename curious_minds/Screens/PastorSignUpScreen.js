import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import { db } from '../FireDatabase/config';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  LayoutAnimation,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class PastorSignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Username: '',
      Password: '',
      Email: '',
      preach: '',
      seminary: '',
      addintionalInfo: '',
    };
    this.clearFirstName = React.createRef();
    this.clearLastName = React.createRef();
    this.clearUsername = React.createRef();
    this.clearPassword = React.createRef();
    this.clearEmail = React.createRef();
    this.clearPreach = React.createRef();
    this.clearSeminary = React.createRef();
    this.clearAdditionalInfo = React.createRef();
  }

  async handleSignUp(navigation){
    const valid = await this.checkUsername();
    if(valid){
      let UserId;
      firebase.auth()
      .createUserWithEmailAndPassword(this.state.Email, this.state.Password)
      .then(data => UserId = data.user.uid)
      .then(() => db.ref('/userInfo').push({
        First: "" + this.state.FirstName,
        Last: "" + this.state.LastName,
        Username: "" + this.state.Username,
        Preach: "" + this.state.preach,
        Seminary: "" + this.state.seminary,
        AddintionalInfo: "" + this.state.addintionalInfo,
        pastorCode: "" + (Math.random().toString(16).substring(2, 6) + Math.random().toString(16).substring(2, 6)),
        uid: UserId,
        commentNum: 0,
        postNum: 0,
        score: 0,
        userType: "pastor"
      }).catch((error)=>{
        Alert.alert('error ', error)
      }))
      .then(() => navigation.reset({
        index: 0,
        routes: [{ name: 'Main'}],
      }))
      .catch(error => Alert.alert(error.message));
    }
  };

  async checkUsername(){
    let usernames = [];
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
        usernames.push(
          child.val().Username
        );
      })
    });
    if(usernames.includes(this.state.Username)){
      Alert.alert('username is already in use\nPlease try a different username');
      return false;
    }else{
      return true;
    }
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            extraHeight={100}
          >
            <View style={styles.logo}>
              <Image source={require('../images/CM_logo02.png')} />
            </View>
            <View>
              <Text style={styles.infoHereText}>* required fields</Text>
            </View>
            <View>
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <TextInput
                  style={styles.namesInput}
                  placeholder="  First name"
                  placeholderTextColor="black"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({FirstName: e,});}}
                  ref={this.clearFirstName}
                />
                <TextInput
                  style={styles.namesInput}
                  placeholder="  Last name"
                  placeholderTextColor="black"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({LastName: e,});}}
                  ref={this.clearLastName}
                />
              </View>
              <View style={{flexDirection: 'column'}}>
                <TextInput
                  style={styles.inputBox}
                  placeholder="  Username*"
                  placeholderTextColor="black"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({Username: e,});}}
                  ref={this.clearUsername}
                />
                <TextInput
                  style={styles.inputBox}
                  placeholder="  Password*"
                  secureTextEntry={true}
                  placeholderTextColor="black"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({Password: e,});}}
                  ref={this.clearPassword}
                />
                <TextInput
                  style={styles.inputBox}
                  placeholder="  Email*"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({Email: e,});}}
                  ref={this.clearEmail}
                />
                <TextInput
                  style={styles.inputBox}
                  placeholder="  Church preaching at"
                  placeholderTextColor="black"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({preach: e,});}}
                  ref={this.clearPreach}
                />
                <TextInput
                  style={styles.inputBox}
                  placeholder="  Where did you attend Seminary?"
                  placeholderTextColor="black"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({seminary: e,});}}
                  ref={this.clearSeminary}
                />
                <TextInput
                  style={styles.multiline}
                  placeholder="  Any additional information you would like to share"
                  placeholderTextColor="black"
                  multiline={true}
                  numberOfLines={10}
                  blurOnSubmit={true}
                  returnKeyType='done'
                  onChangeText={e => {this.setState({addintionalInfo: e,});}}
                  ref={this.clearAdditionalInfo}
                />
              </View>
            </View>
            <View style={{marginBottom: 30}}>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => this.handleSignUp(this.props.navigation)}>
                <Text style={styles.customBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
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
    marginTop: 50,
    marginBottom:30,
  },
  namesInput: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 150,
    height: 40,
    textAlign: 'left',
    marginTop: 10,
    margin: 10,
  },
  inputBox: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 320,
    height: 40,
    textAlign: 'left',
    marginTop: 10,
    margin: 10,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 320,
    height: 100,
    textAlign: 'left',
    marginTop: 10,
    margin: 10,
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
    width: 250,
    marginVertical: 15,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center",
  },
  infoHereText: {
    fontSize: 20,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
});
