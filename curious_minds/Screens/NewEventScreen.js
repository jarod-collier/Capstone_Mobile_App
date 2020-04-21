import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { db } from '../FireDatabase/config';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
} from 'react-native';

export default class NewEventScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Description: '',
      location: '',
      chosenDate: '',
      chosenTime: '',
      date: new Date(),
      time: new Date(),
      showDate: false,
      showTime: false,
    }
    this.clearName = React.createRef();
    this.clearDescription = React.createRef();
    this.clearLocation = React.createRef();
  }

  onChangeDate = (event , selectedDate) => {
    console.log("event tyep: " + event.type);
    if (event.type === "set") {
      let currentDate = selectedDate || this.state.date;
      this.state.chosenDate = currentDate.toString().substring(0,16);
      this.setState({showDate: false});
      this.setState({date: currentDate});
    }
    else{
      this.setState({showDate: false});
    }
  }

  onChangeTime = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTime = selectedTime || this.state.time;
      let hours24 = currentTime.getHours();
      let mins = currentTime.getMinutes();
      if (mins < 10){
        mins = "0" + mins;
      }
      let period = hours24 > 12 ? "PM" : "AM";
      let hours12 = (currentTime.getHours() + 24) %12 || 12
      this.state.chosenTime = '' + hours12 + ":" + mins + " " + period;
      this.setState({showTime: false});
      this.setState({time: currentTime});
    }
    else{
      this.setState({showTime: false});
    }
  }

  createEvent(){
    db.ref('/events').push({
      title: this.state.Name,
      desc: this.state.Description,
      date: this.state.chosenDate,
      time: this.state.chosenTime,
      location: this.state.location,
    }).catch((error)=>{
      Alert.alert('error ', error)
    })
    Alert.alert('Event added successfully');
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
          >
            <View style={styles.container}>
              <View>
                <Text style={{ marginTop: 40, marginLeft: 15, fontSize: 24,}}>
                  Event Title
                </Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Type event title here"
                  placeholderTextColor="black"
                  onChangeText={e => {this.setState({Name: e});}}
                  ref={this.clearName}
                />
              </View>
              <View>
                <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24,}}>
                  Description
                </Text>
                <TextInput
                  style={styles.multiline}
                  placeholder="Type event description here"
                  placeholderTextColor="black"
                  multiline={true}
                  numberOfLines={10}
                  returnKeyType='done'
                  blurOnSubmit={true}
                  onChangeText={e => {this.setState({Description: e});}}
                  ref={this.clearDescription}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24,}}>
                  Date:
                </Text>
                <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 20, }}>
                  {this.state.chosenDate}
                </Text>
                <TouchableOpacity
                style={styles.setButtons}
                onPress={() => {this.setState({showDate: !this.state.showDate});}}
                >
                  <Text style={{ fontSize: 16, }}>
                    Set Date
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.showDate &&
                <DateTimePicker
                  value={this.state.date}
                  mode={'date'}
                  onChange={this.onChangeDate}
                />
              }
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24,}}>
                  Time:
                </Text>
                <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 20,}}>
                  {this.state.chosenTime}
                </Text>
                <TouchableOpacity
                style={styles.setButtons}
                onPress={() => {this.setState({showTime: !this.state.showTime});}}
                >
                  <Text style={{ fontSize: 16,}}>
                    Set Time
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.showTime &&
                <DateTimePicker
                  value={this.state.time}
                  mode={'time'}
                  onChange={this.onChangeTime}
                />
              }
              <View>
                <Text style={{ marginTop: 20, marginLeft: 15, fontSize: 24,}}>
                  Location:
                </Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Type event location here"
                  placeholderTextColor="black"
                  onChangeText={e => {this.setState({location: e});}}
                  ref={this.clearLocation}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.Buttons}
                  onPress={() => {this.createEvent(); this.props.navigation.navigate('Events')}}
                >
                  <Text style={styles.customBtnText}>Add Event</Text>
                </TouchableOpacity>
              </View>
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
  },
  inputBox: {
    alignItems:'stretch',
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: 'black',
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
    borderRadius: 15,
    height: 40,
    marginHorizontal: 15,
    marginBottom: 35,
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
  setButtons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 90,
    marginHorizontal: 15,
    marginTop: 17,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
});
