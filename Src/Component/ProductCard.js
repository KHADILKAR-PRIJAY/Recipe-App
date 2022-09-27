import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";

export default function ProductCard({ data, navigation, RefreshData }) {
  let DeletProduct = () => {
    firebase
      .firestore()
      .collection("Products")
      .doc(data.id)
      .delete()
      .then(() => {
        alert("deleted");
        RefreshData();
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{data?.Product_Name}</Text>
      <Image source={{ uri: data?.image }} style={styles.image} />
      <Text style={styles.catagery}>{data?.Product_Catagery}</Text>
      <Text style={styles.ShotDetail}>{data?.Product_ShotDetail}</Text>
      <Text style={styles.price}>{data?.Product_Price}$</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => DeletProduct()}>
          <AntDesign name="delete" size={22} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProduct", { data: data })}
        >
          <AntDesign name="edit" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  container: {
    backgroundColor: "white",
    alignSelf: "center",
    width: "46%",
    margin: 5,
    padding: 10,
    elevation: 4,
    borderRadius: 5,
  },
  productName: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
  },
  catagery: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  ShotDetail: {
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
  image: {
    width: 110,
    height: 110,
    alignSelf: "center",
  },
  buttons: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: 60,
    marginVertical: 5,
  },
});
