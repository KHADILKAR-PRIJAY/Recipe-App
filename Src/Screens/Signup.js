import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../Component/input";
import firebase from "firebase";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {};
  }

  _getInputValue = (text, value) => {
    this.setState({
      [value]: text,
    });
  };
  _Signup = () => {
    let { Name, Email, Password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email, Password)
      .then((res) => {
        console.log(res.user.uid);
        firebase
          .database()
          .ref("/")
          .child(`user/${res.user.uid}`)
          .set({
            name: Name,
            email: Email,
          })
          .then(() => {
            this.props.navigation.navigate("Home");
            alert("Signup Success");
          });
      })
      .catch(function (error) {
        console.log(`Failed ${error.message}`);
        alert(`Failed ${error.message}`);
      });
  };
  render() {
    let { Name, Email, Password } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require("./../Images/logo.jpg")}
            style={styles.image}
          />
          <View style={styles.InputView}>
            <Input
              placeholder="Name"
              security={false}
              onChangeText={this._getInputValue}
            />
            <Input
              placeholder="Email"
              security={false}
              onChangeText={this._getInputValue}
            />
            <Input
              placeholder="Password"
              security={true}
              onChangeText={this._getInputValue}
            />
            <TouchableOpacity
              style={styles.login}
              disabled={Name && Email && Password ? false : true}
            >
              <Text style={styles.login_Text} onPress={() => this._Signup()}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.lastView}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.lastText}>Already have account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: "50%",
    height: 160,
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 100,
  },

  login: {
    width: "100%",
    backgroundColor: "black",
    alignSelf: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  login_Text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },

  lastView: {
    flex: 1,
    justifyContent: "center",
  },
  lastText: {
    textAlign: "center",
    fontSize: 17,
    color: "green",
    fontWeight: "bold",
  },
  InputView: {
    marginTop: 60,
  },
});
