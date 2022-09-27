import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function Card({ data, SeeDetail }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.leftView}>
          <Image source={{ uri: data.image }} style={styles.cardImage} />
        </View>
        <View style={styles.RightView}>
          <Text style={styles.name}> {data.title}</Text>
        </View>
        <TouchableOpacity
          style={styles.add_Button}
          onPress={() => SeeDetail(data)}
        >
          <Text style={styles.addText}>See Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    width: "40%",
  },
  cardImage: {
    width: 100,
    height: 90,
    // borderRadius: 100,
    alignSelf: "center",
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
  },
  RightView: {
    alignSelf: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 12,
  },

  add_Button: {
    borderWidth: 1,
    borderColor: "gray",
    alignSelf: "center",
    padding: 5,
    borderRadius: 5,
  },
  addText: {
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
    fontSize: 12,
  },

  leftView: {
    height: 100,
    width: "30%",
    alignSelf: "center",
    marginTop: 20,
  },
});
