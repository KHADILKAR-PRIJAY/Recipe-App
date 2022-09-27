import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Picker,
} from "react-native";
import Card from "../Component/Card";
import { AntDesign } from "@expo/vector-icons";
import { FavouriteRecipes } from "../Config/Function/function";
import firebase from "firebase";
import { GetFavouriteRecipe } from "../Store/Reducer/RecipeReducer";
import { useSelector, useDispatch } from "react-redux";

export default function Favourite({ navigation }) {
  let cart_Image = (email) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 11,
          }}
        >
          {email}
        </Text>
        <Image
          source={require("./../Images/profile.jpg")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
          }}
        />
      </View>
    );
  };

  const filterData = useSelector((state) => state);

  const dispatch = useDispatch();

  const [uid, setUid] = useState("");
  const [searchName, setsearchName] = useState("");

  let SeeDetail = (v) => {
    navigation.navigate("Detail", { recipe: v });
  };

  useEffect(async () => {
    const unsubscribe = navigation.addListener("focus", async () => {
      FavouriteRecipes().then((res) => {
        if (res) {
          dispatch(GetFavouriteRecipe(res));
        }
      });
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.setOptions({
          headerRight: () => cart_Image(user.email),
        });

        setUid(user.uid);
      }
    });
    // });

    // Return the function to unsubscribe from the event so it gets removed on unmount
  }, []);

  let filterRecipe =
    filterData?.Recipe?.favouriteRecipe &&
    filterData?.Recipe?.favouriteRecipe.filter((name) =>
      name.title.toLowerCase().includes(searchName.toLowerCase())
    );

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Your Favourite Recipe</Text>
        <View style={styles.searchCatageryView}>
          <TextInput
            style={styles.text}
            placeholder="Search By Name"
            placeholderTextColor="gray"
            onChangeText={(text) => setsearchName(text)}
          />
        </View>
        <ScrollView>
          <View style={styles.container}>
            {filterRecipe.length ? (
              filterRecipe.map((v, i) => (
                <Card key={i} data={v} SeeDetail={SeeDetail} />
              ))
            ) : (
              <Text style={styles.notFoud}>Recipe Not Available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    backgroundColor: "lightgray",
    padding: 15,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  cartImage: {
    width: 40,
    height: 40,
    position: "relative",
  },
  order: {
    backgroundColor: "white",
    position: "absolute",
    left: 15,
    top: -4,
    width: 20,
    textAlign: "center",
    padding: 1,
    borderRadius: 50,
    fontSize: 12,
    fontWeight: "bold",
    elevation: 1,
  },
  text: {
    padding: 5,
    color: "black",
  },

  searchCatageryView: {
    height: 50,
    width: "90%",
    color: "black",
    fontSize: 10,
    paddingLeft: 10,
    paddingTop: 5,
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 5,
    marginVertical: 20,
  },
  notFoud: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 200,
  },
});
