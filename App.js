import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {AccessToken,LoginButton, LoginManager} from 'react-native-fbsdk'

type Props = {};
export default class App extends Component<Props> {

fbconnect =() => {
    LoginManager.logInWithReadPermissions(["public_profile","user_events","user_photos"]).then(
        function (result) {
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                console.log(
                    "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
            }
        },
        function (error) {
            console.log("Login fail with error: " + error);
        }
    );
}


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>hey</Text>

          <Button title={"fb"} onPress={this.fbconnect}/>
          <LoginButton
              onLoginFinished={
                  (error, result) => {
                      if (error) {
                          console.log("login has error: " + result.error);
                      } else if (result.isCancelled) {
                          console.log("login is cancelled.");
                      } else {
                          AccessToken.getCurrentAccessToken().then(
                              (data) => {
                                  console.log(data.accessToken.toString())
                              }
                          )
                      }
                  }
              }
              onLogoutFinished={() => console.log("logout.")}/>
      </View>
    );
  }
}

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
