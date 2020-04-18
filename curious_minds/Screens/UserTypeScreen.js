import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
} from 'react-native';

export default class UserTypeScreen extends Component {
  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={require('../images/CM_logo02.png')} />
          </View>
          <View>
            <Text style={styles.iAmText}>Please choose{'\n'}user type</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => this.props.navigation.navigate('Security Code')}
            >
              <Text style={styles.customBtnText}>Pastor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => this.props.navigation.navigate('User SignUp')}>
              <Text style={styles.customBtnText}>Normal user</Text>
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
    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 100,
    marginTop: 100,
    marginBottom:50,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    borderRadius: 25,
    width: 150,
    height: 150,
    margin: 10,
    marginTop: 50,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
  iAmText: {
    fontSize: 35,
    fontWeight: '400',
    color: "black",
    textAlign: "center"
  },
});
