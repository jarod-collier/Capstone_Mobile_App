import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Alert,
  LayoutAnimation,
} from 'react-native';

export default class MainFeedScreen extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      display: [],
      Loading: true,
    };
  }

  async componentDidMount(){
    this._isMounted = true;
    this.setState({Loading: true});
    await this.readFromDB(this.props.navigation);
    this.setState({Loading: false});
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  makeDelay(ms) {
    return new Promise(res => setTimeout(res, ms));
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
      this.refreshScreen();
    }else{
      Alert.alert('post already liked');
    }
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
                this.refreshScreen();
                Alert.alert('Report count exceeded the limit\nThis post will be deleted now\nPlease refresh the screen');
              }.bind(this));
            }else{
              reports.push(uid);
              await db.ref('/posts/').child(key).update({
                reportedBy: reports,
                reports: (reportCount + incAmount),
              });
              this.refreshScreen();
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

  async loadPostCards(navigation){
    this.state.display = this.state.posts.map(postData => {
      return(
        <View key={postData.key}>
          <Button
            style={{backgroundColor: 'silver'}}
            onPress = {()=> navigation.navigate('Thread', {ID: postData.key})}
          >
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
                  onPress={() => this.likePost(postData.key)}
                  />
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
                  <Text
                    style={{marginTop: 9, opacity: .5, marginLeft: -10}}
                  >{postData.reports}</Text>}
              </View>
            </Card>
          </Button>
        </View>
      )
    });
  }

  async refreshScreen (){
    this.setState({Loading: true}),
    await this.readFromDB(this.props.navigation),
    this.makeDelay(500).then(()=> this.setState({Loading: false}));
  }

  async readFromDB(navigation){
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
      this.setState({posts: postItems.reverse()});
    }.bind(this));
    await this.loadPostCards(navigation);
  }

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.Loading}
              onRefresh={async () => {this.refreshScreen();}}
            />
          }
        >
          <View style={styles.container}>
            {this.state.display.length > 0 ?
              this.state.display
              :
              <Text style={{color: 'black', alignSelf: 'center', opacity: 0.5, marginTop: 30}}>
                No posts found. Please make a new post
              </Text>
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
