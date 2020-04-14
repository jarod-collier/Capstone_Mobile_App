import 'react-native-gesture-handler';
import React, {Component, useState, useCallback, useRef} from 'react';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
  RefreshControl,
  Alert,
  LayoutAnimation,
} from 'react-native';

var state = {
  posts: [],
  display: [],
  Loading: true,
};

const delay = ms => new Promise(res=>setTimeout(res,ms));

async function likePost(key){
  let uid = firebase.auth().currentUser.uid;
  let likes = [];
  let likesCount;

  await db.ref('/posts/').once('value', function(snapshot){
    snapshot.forEach((child) => {
      if(child.key === key){
        likes = child.val().likedBy;
        likesCount = child.val().likes;
      }
    })
  });

  if(!likes.includes(uid)){
    likes.push(uid);

    await db.ref('/posts/').child(key).update({
      likedBy: likes,
      likes: (likesCount + 1),
    });
    Alert.alert('post liked\nPlease refresh the screen');

  }else{
    Alert.alert('post already liked');
  }
}

async function reportPost(key){
  let uid = firebase.auth().currentUser.uid;
  let reports = [];
  let reportCount;
  let userType;
  let incAmount = 1;

  

  await db.ref('/userInfo/').once('value', function(snapshot){
    snapshot.forEach((child) => {
      if(child.val().uid === uid){
        userType = child.val().userType;
      }
    });
  });

  if(userType === 'pastor'){
    incAmount = 5;
  }

  await db.ref('/posts/').once('value', function(snapshot){
    snapshot.forEach((child) => {
      if(child.key === key){
        reports = child.val().reportedBy;
        reportCount = child.val().reports;
      }
    })
  });

  if(!reports.includes(uid)){
    Alert.alert(
      'Report Post',
      'Are you sure you want to report this post?',
      [
        {text: 'Cancel', onPress: () => {}},
        {text: 'REPORT', onPress: async () => {
          if((reportCount + incAmount) >= 5){
            await db.ref('/posts/').child(key).remove().then(function(){
              Alert.alert('Report count exceeded the limit\nThis post will be deleted now\nPlease refresh the screen');
            })
          }else{
            reports.push(uid);
            await db.ref('/posts/').child(key).update({
              reportedBy: reports,
              reports: (reportCount + incAmount),
            });
            Alert.alert('This post was reported\nThank you');
          }
        }, style: {color: 'red'}}
      ],
      {cancelable: true}
    )    
  }else{
    Alert.alert('You already reported this post');
  }
}

async function readFromDB(navigation){
  state.Loading = true;
  let uid = firebase.auth().currentUser.uid;

  await db.ref('/posts/').once('value', function(snapshot){
    let postItems = [];
    snapshot.forEach((child) => {
      var alreadyLikedpost = 'black';
      var alreadyReportedpost = 'black';
      for (var user in child.val().likedBy){
        if(child.val().likedBy[user] === uid){
          alreadyLikedpost = 'blue';
        }
      }

      for (var user in child.val().reportedBy){
        if(child.val().reportedBy[user] === uid){
          alreadyReportedpost = 'red';
        }
      }

      postItems.push({
        key: child.key,
        username: child.val().username,
        date: child.val().date,
        question: child.val().question,
        likes: child.val().likes,
        desc: child.val().desc,
        reports: child.val().reports,
        anon: child.val().Anon,
        pastorOnly: child.val().PastorOnly,
        likeColor: alreadyLikedpost,
        reportColor: alreadyReportedpost,
      });
    })
    state.posts = postItems.reverse();
  });
  await loadPostCards(navigation);
}

async function loadPostCards(navigation){
  state.display = state.posts.map(postData => {
    return(
      likeColor = 'black',
      <View key={postData.key}>
        <Button
        style={{backgroundColor: 'silver'}}
        onPress = {()=> navigation.navigate('Thread', postData.key)}>
        <Card style={{ padding: 15, alignSelf: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{postData.question}</Text>
            <Text style={{marginTop: 3}}>{postData.desc}</Text>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end', opacity: 0.5}}>
              <Text>Posted</Text>
              { !postData.anon && <Text> by: {postData.username}</Text>}
              <Text> on {postData.date}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'stretch'}}>
              <Button
                style={{backgroundColor: 'white'}}
                color='black'
                name='comment'
                onPress={()=> navigation.navigate('Thread', postData.key)} />
              <Button
                style={{backgroundColor: 'white'}}
                color='black'
                name='language'
                onPress={()=> Alert.alert('Translate')} />
              <Button
                style={{backgroundColor: 'white'}}
                color= {postData.likeColor}
                name='thumbs-up'
                onPress={() => likePost(postData.key)} 
                />
                {postData.likes > 0 && 
                <Text
                  style={{marginTop: 9, opacity: .5, marginLeft: -10}}
                >{postData.likes}</Text>}
              <Button
                style={{backgroundColor: 'white'}}
                color={postData.reportColor}
                name='exclamation-triangle'
                onPress={()=> reportPost(postData.key)} />
                {postData.reports > 0 && 
                <Text
                  style={{marginTop: 9, opacity: .5, marginLeft: -10}}
                >{postData.reports}</Text>}
          </View>
        </Card>
        </Button>
      </View>
    )
  });
  state.Loading = false;
}

function MainFeedScreen({navigation}) {
    const [isLoading, setLoading]= useState(true);
    const onRefresh = useCallback(() => {
      setLoading(true);
      delay(2000).then(()=> setLoading(false))}, [isLoading]
    );
    readFromDB(navigation);
    LayoutAnimation.easeInEaseOut();
    return (
      setTimeout(()=> setLoading(false), 500),
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={styles.container}>
            {state.display}
          </View>
          {/* <Modal
           transparent={true}
           animationType={'none'}
           visible={isLoading}
          >
            <ActivityIndicator size="large" color="black" style={{flex: 1}}/>
          </Modal> */}
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  logo: {
    margin: 100,
  },
  overlay: {
    // flex:1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    // opacity: 0.1,
    // backgroundColor: '#696969',
  },
  inputBox: {
    alignItems:'stretch',
    borderRadius: 15,
    borderColor: 'white',
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
    borderColor: 'white',
    borderRadius: 15,
    height: 40,
    marginHorizontal: 15,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
    height: 150,
    textAlign: 'left',
    margin: 15,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  footer: {
    bottom: 0,
  },
});

export default MainFeedScreen;
