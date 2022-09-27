import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase";

export default function Profile() {
  let [email, setEmail] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image
        source={require("./../Images/profile.jpg")}
        style={styles.profile}
      />
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 120,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
  },
  email: {
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
});
