import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appName}>Food Restaurant </Text>
        <Image source={require("./../Images/logo.jpg")} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f12b62",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 50,
  },
  appName: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
  },
});
