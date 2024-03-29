/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Crashes from "mobile-center-crashes";
import Analytics from "mobile-center-analytics";
import Push from 'mobile-center-push';
import {
  AppState,
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  Alert,
  View
} from 'react-native';
 function ClickBtn() { 
   const installId =  MobileCenter.getInstallId();
   alert(installId.Result.toString());  
}

function ChangeDisable() {  
    this.setState({  
        disabled: this.state.disabled ? false : true  
  }); 
  throw new Error("This is a test javascript crash!"); 
} 
export default class iOSReactTemp extends Component {
  constructor(props){        
     super(props);   
     this.state = {  
         disabled : false,  
      }  
   }
  render() {
    Analytics.trackEvent("Learn More");
    return (
      <View style={styles.container}>
        <Button  
                onPress={ClickBtn}  
                title="Learn More"  
                color="green"  
               disabled={this.state.disabled}  
               accessibilityLabel="Learn more about this purple button" 
        /> 
        <Button  
              onPress={ChangeDisable.bind(this)}  
              title="change"  
              color="gray"  
             accessibilityLabel="Learn more about this purple button"
             /> 
      </View>
    );
  }
}
Push.setEventListener({
  pushNotificationReceived: function (pushNotification) {
    let message = pushNotification.message;
    let title = pushNotification.title;

    if (message === null || message === undefined) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = "iOS background";
      message = "<empty>";
    }

    // Custom name/value pairs set in the Mobile Center web portal are in customProperties
    if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
      message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
    }

    if (AppState.currentState === 'active') {
      Alert.alert(title, message);
    }
    else {
      // Sometimes the push callback is received shortly before the app is fully active in the foreground. This
      // only seems to happen on Android, not iOS. In this case you'll want to save off the notification info
      // and wait until the app is fully shown in the foreground before displaying any UI. You could
      // use AppState.addEventListener to be notified when the app is fully in the foreground.
    }
  }
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('iOSReactTemp', () => iOSReactTemp);
