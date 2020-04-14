import React, {Component, useCallback, useState} from 'react';
import 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';
import { useFocusEffect } from '@react-navigation/native';
import renderIf from 'render-if'

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var state = {
  display: [],
  comments: [],
  Loading: true,
  comment: '',
  PastorOnly: false,
  posterUser: '',
  userCanComment: true,
};

const handleComment = text => {
    state.comment = text;
  };

const delay = ms => new Promise(res=>setTimeout(res,ms));

async function profileComment(userRef) {

  //get the current value.
  var commentNumber;
  await db.ref('/userInfo').child(userRef.key).once('value',function(snapshot) {
    commentNumber = snapshot.val().commentNum;
  });

  commentNumber = commentNumber + 1;

  //update the value.
  await db.ref('/userInfo/').child(userRef.key).update({
    commentNum: commentNumber,
  });
}

async function addComment(postID){
    state.Loading = true;
    var username;
    let uid = firebase.auth().currentUser.uid;
    var userRef;

    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
        if(child.val().uid === uid){
          username = child.val().Username;
          userRef = child;
        }
    })
  });

    await profileComment(userRef);


  db.ref('/posts/' + postID).push({
    comment: state.comment,
    username: username,
    date: "" + new Date().toLocaleDateString(),
  }).catch((error)=>{
    Alert.alert('error ', error)
  })

  Alert.alert('comment added successfully');
  state.Loading = false;
  clearComment.current.clear();
}

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

async function canComment(){
  let uid = firebase.auth().currentUser.uid;
  let userCan = true;
  if(state.PastorOnly){
    await db.ref('/userInfo/').once('value', function(snapshot){
      snapshot.forEach((child) => {
        if(child.val().uid === uid){
          if(child.val().userType != "pastor" && child.val().Username != state.posterUser){
            userCan = false;
          }
        }
      });
    });
  }
  state.userCanComment = userCan;
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

async function readFromDB(postID){
  state.Loading = true;
  let uid = firebase.auth().currentUser.uid;
  let commentItems = [];
  let postItems = [];
  await db.ref('/posts/' + postID).once('value', function(snapshot){
    var alreadyLikedpost = 'black';
    var alreadyReportedpost = 'black';
    snapshot.forEach((child) => {
        if(((child.key != "likedBy")&& (child.key != "reportedBy")) && child.hasChildren()){
            commentItems.push({
              comment: child.val().comment,
              date: child.val().date,
              username: child.val().username,
            });
        }
    });

    for (var user in snapshot.val().likedBy){
      if(snapshot.val().likedBy[user] === uid){
        alreadyLikedpost = 'blue';
      }
    }

    for (var user in snapshot.val().reportedBy){
      if(snapshot.val().reportedBy[user] === uid){
        alreadyReportedpost = 'red';
      }
    }

    postItems.push({
      key: postID,
      question: snapshot.val().question,
      username: snapshot.val().username,
      date: snapshot.val().date,
      desc: snapshot.val().desc,
      likes: snapshot.val().likes,
      reports: snapshot.val().reports,
      anon: snapshot.val().Anon,
      pastorOnly: snapshot.val().PastorOnly,
      likeColor: alreadyLikedpost,
      reportColor: alreadyReportedpost,
    })
    state.PastorOnly = snapshot.val().PastorOnly;
    state.posterUser = snapshot.val().username;
  });
  await canComment();
  await loadCommentCards(commentItems);
  await loadPostCards(postItems);
}

async function loadCommentCards(commentItems){
  var cardId = 0;
  state.comments = commentItems.map(commentData => {
    cardId++;
    return(
      <View key={cardId}>
        <Card style={{ padding: 15, margin: 5, alignSelf: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{commentData.comment}</Text>
          <View style={{flexDirection: 'row',alignSelf: 'flex-end', opacity: 0.5}}>
            <Text>By: {commentData.username} </Text>
            <Text>on {commentData.date}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems: 'stretch'}}>
            <Button
              style={{backgroundColor: 'white'}}
              color='black'
              name='exclamation-triangle'
              onPress={()=> Alert.alert('Report')} />
          </View>
        </Card>
      </View>
    )
  });
}

async function loadPostCards(postItems){
  state.display = postItems.map(postData => {
  return(
    <View key={postData.key}>
      <Card style={{ padding: 15, margin: 5, alignSelf: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{postData.question}</Text>
        <Text style={{marginTop: 3}}>{postData.desc}</Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-end', opacity: 0.5}}>
          { !postData.anon && <Text>Posted by: {postData.username} </Text>}
          <Text> on {postData.date}</Text>
        </View>
        <View style={{flexDirection:'row', alignItems: 'stretch'}}>
          <Button
            style={{backgroundColor: 'white'}}
            color='black'
            name='language'
            onPress={()=> Alert.alert('Translate')} />
          <Button
            style={{backgroundColor: 'white'}}
            color={postData.likeColor}
            name='thumbs-up'
            onPress={()=> likePost(postData.key)} />
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
    </View>
  )});
  state.Loading = false;
}

var focused = false;
var clearComment = React.createRef();

function ThreadScreen({route, navigation}) {
  var postID = route.params;
  const [isLoading, setLoading]= useState(true);
  const onRefresh = useCallback(() => {
    setLoading(true);
    delay(2000).then(()=> setLoading(false))}, [isLoading]
  );
  readFromDB(postID);
  LayoutAnimation.easeInEaseOut();
  useFocusEffect(
    React.useCallback(() => {
      focused = true;
      // Do something when the screen is focused
      return () => {
        focused = false;
        // Do something when the screen is unfocused
      };
    }, [])
  );
  return (
    setTimeout(()=> setLoading(false), 500),
    <SafeAreaView style={{flex: 1}}>
    {renderIf(focused)(
      <KeyboardAwareScrollView
        style={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.container}>
          {state.display}
          {state.comments}
          {state.userCanComment && <View>
          <Text style={{marginTop: 20, marginLeft: 18, fontSize: 24,}}>
            Add comment:
          </Text>

          <TextInput
            style={styles.multiline}
            multiline = {true}
            numberOfLines={10}
            placeholder="  Enter Comment Here"
            placeholderTextColor="black"
            onChangeText={handleComment}
            ref={clearComment}
          />
          <TouchableOpacity
            style={styles.Buttons}
            onPress={() => {addComment(postID), onRefresh}}
          >
            <Text style={styles.customBtnText}>Post</Text>
          </TouchableOpacity>
        </View>}
      </View>

    </KeyboardAwareScrollView>
    )}
  </SafeAreaView>
 );
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
    borderWidth: 1,
    textAlign: 'center',
    // padding: 10,
    margin: 10,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    // borderWidth: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    // borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 30,
    height: 30,
    marginHorizontal: 15,
  },
  multiline: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'stretch',
    height: 100,
    textAlign: 'left',
    margin: 10,
    marginHorizontal: 18,
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
export default ThreadScreen;
