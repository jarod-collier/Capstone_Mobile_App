import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {CheckBox} from 'react-native-elements';
import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { db } from '../FireDatabase/config';

export default class ResetPasswordScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: {},
      Question: '',
      Description: '',
      Anon: false,
      pastorOnly: false,
      username: '',
    };

    this.clearQuestion = React.createRef();
    this.clearDescription = React.createRef();
  }

  async updateProfile(){
    let uid = firebase.auth().currentUser.uid;
    let numberOfPosts = 0;
    var userRef;

    // Get the current value
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
          if(child.val().uid === uid){
            numberOfPosts = child.val().postNum;
            userRef = child;
          }
      })
    });

    numberOfPosts = numberOfPosts + 1;

    //update the value.
    await db.ref('/userInfo/').child(userRef.key).update({
      postNum: numberOfPosts,
    });
  }

  async createPost(){
    let uid = firebase.auth().currentUser.uid;
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
          if(child.val().uid === uid){
            this.setState({username: child.val().Username});
          }
      })
    }.bind(this));

    db.ref('/posts').push({
      username: "" + this.state.username,
      date: "" + new Date().toLocaleDateString(),
      question: "" + this.state.Question,
      desc: "" + this.state.Description,
      likes: 0,
      likedBy: [""],
      reports: 0,
      reportedBy: [""],
      Anon: this.state.Anon,
      PastorOnly: this.state.pastorOnly
    }).catch((error)=>{
      Alert.alert('error ', error)
    })
    Alert.alert('Post added successfully');
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View>
            <Text style={
              {
                marginTop: 40,
                marginLeft: 15,
                fontSize: 24,
              }}>
              Your Question
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Type your question here"
              placeholderTextColor="black"
              onChangeText={e => {this.setState({Question: e});}}
              ref={this.clearQuestion}
            />
          </View>
          <View>
            <Text style={
              {
                marginTop: 20,
                marginLeft: 15,
                fontSize: 24,
              }}>
                Description
            </Text>
            <TextInput
              style={styles.multiline}
              placeholder="Type your description here"
              placeholderTextColor="black"
              multiline={true}
              numberOfLines={10}
              blurOnSubmit={true}
              returnKeyType='done'
              onChangeText={e => {this.setState({Description: e});}}
              ref={this.clearDescription}
            />
          </View>
          <View>
            <Text style={
              {
                marginTop: 20,
                marginLeft: 15,
                fontSize: 24,
              }}>
                Attachment:
            </Text>
          </View>
          <View>
            <Text style={
              {
                marginTop: 20,
                marginLeft: 15,
                fontSize: 24,
              }}>
                Options:
            </Text>
            <View style={{ flexDirection: 'row'}}>
              <CheckBox
                checked={this.state.Anon}
                checkedColor='dodgerblue'
                uncheckedColor='black'
                onPress={()=> {this.setState({Anon: !this.state.Anon})}}
              />
              <Text style={{marginTop: 15, fontSize: 18}}>post anonymous</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <CheckBox
                checked={this.state.pastorOnly}
                checkedColor='dodgerblue'
                uncheckedColor='black'
                onPress={() => {this.setState({pastorOnly: !this.state.pastorOnly})}}
              />
              <Text style={{marginTop: 15, fontSize: 18}}>only pastor response</Text>
            </View>
          </View>
          <View style={{bottom: 0, position: 'absolute', justifyContent: 'center', alignSelf: 'center'}}
          >
            <TouchableOpacity
              style={styles.Buttons}
               onPress={async () => {await this.createPost(); await this.updateProfile(); this.props.navigation.navigate('Main')}}
              >
              <Text style={styles.customBtnText}>Post</Text>
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
    backgroundColor: 'silver',
  },
  logo: {
    margin: 100,
  },
  inputBox: {
    alignItems:'stretch',
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    textAlign: 'left',
    padding: 10,
    margin: 15,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderColor: 'green',
    borderRadius: 15,
    height: 40,
    width: 350,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
    height: 150,
    textAlign: 'left',
    margin: 15,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
  footer: {
    bottom: 0,
  },
});

// export default NewPostScreen;
