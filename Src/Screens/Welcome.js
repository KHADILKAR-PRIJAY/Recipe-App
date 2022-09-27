import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("./../Images/logo.jpg")} style={styles.logo} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f12b62",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    backgroundColor: "white",
    width: "80%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    borderRadius: 100,
    width: 200,
    marginBottom: 50,
    height: 200,
  },
});
