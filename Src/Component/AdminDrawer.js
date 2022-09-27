import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

export default function AdminDrawer({ navigation, route }) {
  return (
    <View>
      <Ionicons
        name="arrow-back-outline"
        size={30}
        color="black"
        style={styles.icon}
        onPress={() => {
          console.log(route.params.path);
          // navigation.goBack();
          navigation.replace(route.params.path);
        }}
      />

      <Image source={require("./../Images/profile.jpg")} style={styles.image} />
      <Text style={styles.email}>Admin@Admin.com</Text>

      <View>
        <TouchableOpacity
          style={styles.draweritem}
          onPress={() => navigation.navigate("AdminHome")}
        >
          <MaterialIcons
            name="home"
            size={24}
            color={route.params.path === "AdminHome" ? "green" : "black"}
          />
          <Text
            style={[
              styles.itemText,
              {
                color: route?.params?.path === "AdminHome" ? "green" : "black",
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.draweritem}
          onPress={() => navigation.navigate("AddProdunct")}
        >
          <MaterialIcons
            name="post-add"
            size={24}
            color={route.params.path === "AddProdunct" ? "green" : "black"}
          />
          <Text
            style={[
              styles.itemText,
              {
                color:
                  route?.params?.path === "AddProdunct" ? "green" : "black",
              },
            ]}
          >
            Add Product
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.draweritem}
          onPress={() => navigation.navigate("AddCategory")}
        >
          <MaterialIcons
            name="post-add"
            size={24}
            color={route.params.path === "AddCategory" ? "green" : "black"}
          />
          <Text
            style={[
              styles.itemText,
              {
                color:
                  route?.params?.path === "AddCategory" ? "green" : "black",
              },
            ]}
          >
            Add category
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.draweritem}
          onPress={() => navigation.navigate("TotalOrder")}
        >
          <Entypo
            name="bar-graph"
            size={24}
            color={route.params.path === "TotalOrder" ? "green" : "black"}
          />
          <Text
            style={[
              styles.itemText,
              {
                color: route?.params?.path === "TotalOrder" ? "green" : "black",
              },
            ]}
          >
            Total Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.draweritem}
          onPress={() => navigation.navigate("OrderStatus")}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color={route.params.path === "OrderStatus" ? "green" : "black"}
          />
          <Text
            style={[
              styles.itemText,
              {
                color:
                  route?.params?.path === "OrderStatus" ? "green" : "black",
              },
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
  image: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  draweritem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginVertical: 5,
    paddingVertical: 10,
  },
  email: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  itemText: {
    marginLeft: 10,
  },
});
