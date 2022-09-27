import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Input from "../Component/input";
import firebase from "firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("Home");
      }
    });
  };
  _Login = () => {
    let { Email, Password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        this.props.navigation.navigate("Home");
        alert("Login Success");
      })
      .catch(function (error) {
        alert(`Failed ${error.message}`);
      });
  };
  render() {
    let { Email, Password } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView>
            <Image
              source={require("./../Images/logo.jpg")}
              style={styles.image}
            />
            <View style={styles.InputView}>
              <Input
                placeholder="Email"
                security={false}
                onChangeText={(Text) => this.setState({ Email: Text })}
              />
              <Input
                placeholder="Password"
                security={true}
                onChangeText={(Text) => this.setState({ Password: Text })}
              />
              <TouchableOpacity
                style={styles.login}
                disabled={Email && Password ? false : true}
                onPress={() => this._Login()}
              >
                <Text style={styles.login_Text}>Login</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.lastView}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={styles.lastText}>Don't have account? SignUp</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
  appName: {
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 30,
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
    marginTop: 50,
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
