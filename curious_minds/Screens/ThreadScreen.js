import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
  LayoutAnimation,
} from 'react-native';

export default class ThreadScreen extends Component {

  _isMounted = false;

  constructor(props){
    super(props);
    this.state = {
      display: [],
      comments: [],
      Loading: true,
      comment: '',
      PastorOnly: false,
      posterUser: '',
      userCanComment: true,
      postID: '',
    };
  }

  makeDelay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  async componentDidMount(){
    this._isMounted = true;
    this.setState({Loading: true});
    this.state.postID = this.props["route"]["params"]["ID"];
    await this.readFromDB(this.state.postID);
    this.setState({Loading: false});
    this.focused = false;
    this.clearComment = React.createRef();
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async refreshScreen (){
    this.setState({Loading: true}),
    await this.readFromDB(this.state.postID),
    this.makeDelay(500).then(()=> this.setState({Loading: false}));
  }

  async profileComment(userRef) {

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

  async addComment(postID){
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

    await this.profileComment(userRef);

    db.ref('/posts/' + postID).push({
      comment: this.state.comment,
      username: username,
      date: "" + new Date().toLocaleDateString(),
      reportedBy: [""],
      reports: 0,
    }).catch((error)=>{
      Alert.alert('error ', error)
    })

    Alert.alert('comment added successfully');
    this.refreshScreen();
    this.clearComment.current.clear();
  }

  async likePost(key){
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
      this.refreshScreen(this.state.postID);
    }else{
      Alert.alert('post already liked');
    }
  }

  async canComment(){
    let uid = firebase.auth().currentUser.uid;
    let userCan = true;
    if(this.state.PastorOnly){
      await db.ref('/userInfo/').once('value', function(snapshot){
        snapshot.forEach((child) => {
          if(child.val().uid === uid){
            if(child.val().userType != "pastor" && child.val().Username != this.state.posterUser){
              userCan = false;
            }
          }
        });
      }.bind(this));
    }
    this.state.userCanComment = userCan;
  }

  async reportPost(key){
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
                Alert.alert('Report count exceeded the limit\nThis post will be deleted now'); 
              })
              this.props.navigation.navigate('Main');
            }else{
              reports.push(uid);
              await db.ref('/posts/').child(key).update({
                reportedBy: reports,
                reports: (reportCount + incAmount),
              });
              Alert.alert('This post was reported\nThank you');
              this.refreshScreen(this.state.postID);
            }
          }, style: {color: 'red'}}
        ],
        {cancelable: true}
      )
    }else{
      Alert.alert('You already reported this post');
    }
  }

  async reportComment(commentId){
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

    await db.ref('/posts/' + this.state.postID + '/' + commentId).once('value', function(snapshot){
      reports = snapshot.val().reportedBy;
      reportCount = snapshot.val().reports;
    });

    if(!reports.includes(uid)){
      Alert.alert(
        'Report Comment',
        'Are you sure you want to report this comment?',
        [
          {text: 'Cancel', onPress: () => {}},
          {text: 'REPORT', onPress: async () => {
            if((reportCount + incAmount) >= 5){
              await db.ref('/posts/' + this.state.postID).child(commentId).remove().then(function(){
                Alert.alert('Comment count exceeded the limit\nThis post will be deleted now'); 
              })
              this.refreshScreen(this.state.postID);
            }else{
              reports.push(uid);
              await db.ref('/posts/' + this.state.postID).child(commentId).update({
                reportedBy: reports,
                reports: (reportCount + incAmount),
              });
              Alert.alert('This comment was reported\nThank you');
              this.refreshScreen(this.state.postID);
            }
          }, style: {color: 'red'}}
        ],
        {cancelable: true}
      )
    }else{
      Alert.alert('You already reported this comment');
    }
  }

  async readFromDB(postID){
    this.state.Loading = true;
    let uid = firebase.auth().currentUser.uid;
    let commentItems = [];
    let postItems = [];
    await db.ref('/posts/' + postID).once('value', function(snapshot){
      var alreadyLikedpost = 'black';
      var alreadyReportedpost = 'black';
      
      snapshot.forEach((child) => {
        var alreadyReportedcomment = 'black';
        if(((child.key != "likedBy")&& (child.key != "reportedBy")) && child.hasChildren()){
          
          for(var user in child.val().reportedBy){
            if(child.val().reportedBy[user] === uid){
              alreadyReportedcomment = 'red'
            }
          }

          commentItems.push({
            commentId: child.key,
            comment: child.val().comment,
            date: child.val().date,
            username: child.val().username,
            cReportColor: alreadyReportedcomment,
            cReportCount: child.val().reports,
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
      this.state.PastorOnly = snapshot.val().PastorOnly;
      this.state.posterUser = snapshot.val().username;
    }.bind(this));
    await this.canComment();
    await this.loadCommentCards(commentItems);
    await this.loadPostCards(postItems);
  }

  async loadCommentCards(commentItems){
    this.state.comments = commentItems.map(commentData => {
      return(
        <View key={commentData.commentId}>
          <Card style={{ padding: 15, margin: 5, alignSelf: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{commentData.comment}</Text>
            <View style={{flexDirection: 'row',alignSelf: 'flex-end', opacity: 0.5}}>
              <Text>By: {commentData.username} </Text>
              <Text>on {commentData.date}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'stretch'}}>
              <Button
                style={{backgroundColor: 'white'}}
                color={commentData.cReportColor}
                name='exclamation-triangle'
                onPress={()=> this.reportComment(commentData.commentId)} 
              />
              {commentData.cReportCount > 0 &&
              <Text
                style={{marginTop: 9, opacity: .5, marginLeft: -10}}
              >{commentData.cReportCount}</Text>}
            </View>
          </Card>
        </View>
      )
    });
  }

  async loadPostCards(postItems){
    this.state.display = postItems.map(postData => {
    return(
      <View key={postData.key}>
        <Card style={{ padding: 15, margin: 10, alignSelf: 'center'}}>
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
              onPress={()=> this.likePost(postData.key)} />
              {postData.likes > 0 &&
              <Text
                style={{marginTop: 9, opacity: .5, marginLeft: -10}}
              >{postData.likes}</Text>}
            <Button
              style={{backgroundColor: 'white'}}
              color={postData.reportColor}
              name='exclamation-triangle'
              onPress={()=> this.reportPost(postData.key)} />
            {postData.reports > 0 &&
              <Text style={{marginTop: 9, opacity: .5, marginLeft: -10}}>
                {postData.reports}
              </Text>
            }
          </View>
        </Card>
      </View>
    )});
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.Loading}
              onRefresh={async () => {this.refreshScreen();}}
            />
          }
        >
          <View style={styles.container}>
            {this.state.display}
            {this.state.comments}
            {this.state.userCanComment && 
              <View>
                <Text style={{marginTop: 20, marginLeft: 18, fontSize: 24,}}>
                  Add comment:
                </Text>
                <TextInput
                  style={styles.multiline}
                  multiline = {true}
                  numberOfLines={10}
                  placeholder="  Enter Comment Here"
                  placeholderTextColor="black"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({comment: e});}}
                  ref={this.clearComment}
                />
                <TouchableOpacity
                  style={styles.Buttons}
                  onPress={async() => {await this.addComment(this.state.postID), this.refreshScreen(this.state.postID)}}
                >
                  <Text style={styles.customBtnText}>Post</Text>
                </TouchableOpacity>
              </View>}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    paddingHorizontal: 30,
    height: 30,
    marginHorizontal: 15,
    marginBottom: 20,
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
    textAlign: "center",
  },
});
