import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      uid: "",
      favorite: false,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    console.log(state);
    props.navigation.setOptions({
      title: props.route.params.recipe.title,
    });
    return true;
  };

  addtoFavourite = (recipe) => {
    try {
      let { uid } = this.state;

      let saveobj = {
        title: recipe.title,
        image: recipe.image,
        id: recipe.id,
        nutrition: recipe.nutrition,
        analyzedInstructions: recipe.analyzedInstructions,
      };

      firebase
        .firestore()
        .collection(`allfavourite`)
        .doc(uid)
        .collection(uid)
        .doc(recipe.title)
        .set(saveobj)
        .then(() =>
          this.setState({
            favorite: true,
          })
        );
    } catch (error) {}
  };

  removetoFavourite = (recipe) => {
    let { uid } = this.state;
    firebase
      .firestore()
      .collection(`allfavourite`)
      .doc(uid)
      .collection(uid)
      .doc(recipe.title)
      .delete()

      .then(() => {
        this.setState({
          favorite: false,
        });
      });
  };

  componentDidMount = () => {
    let { recipe } = this.props.route.params;
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        uid: user.uid,
      });
      firebase
        .firestore()
        .collection(`allfavourite`)
        .doc(user.uid)
        .collection(user.uid)
        .doc(recipe.title)
        .get()
        .then((res) => {
          console.log(res.data());
          if (res.data()) {
            this.setState({ favorite: true });
          }
        });
    });
  };

  render() {
    let { recipe } = this.props.route.params;
    console.log(recipe?.analyzedInstructions);
    return (
      <View style={styles.container}>
        {this.state.favorite ? (
          <TouchableOpacity
            style={styles.favourite}
            onPress={() => this.removetoFavourite(recipe)}
          >
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Remove From Favourite{" "}
            </Text>
            <MaterialIcons name="favorite" size={24} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.favourite}
            onPress={() => this.addtoFavourite(recipe)}
          >
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Add To Favourite{" "}
            </Text>
            <MaterialIcons name="favorite-border" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Image source={{ uri: recipe.image }} style={styles.cardImage} />
        <ScrollView style={{ paddingBottom: 30 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{recipe.title}</Text>
          </View>
          {recipe.nutrition?.nutrients && (
            <View>
              <Text style={styles.Stitle}>Nutrients</Text>
              <View style={styles.table}>
                <Text style={styles.name}>Name </Text>
                <Text style={styles.amount}>Amount</Text>
                <Text style={styles.parcentage}>percent Of Daily Needs</Text>
              </View>
              {recipe.nutrition?.nutrients?.map((val, ind) => (
                <View key={ind} style={styles.table}>
                  <Text style={styles.name}> {val.name}</Text>
                  <Text style={styles.amount}>
                    {val.amount}
                    {val.unit}
                  </Text>
                  <Text style={styles.parcentage}>
                    {val.percentOfDailyNeeds}%
                  </Text>
                </View>
              ))}
            </View>
          )}
          {recipe.analyzedInstructions?.[0]?.steps && (
            <View>
              <Text style={styles.Stitle}>Steps</Text>
              {recipe.analyzedInstructions[0]?.steps?.map((val, ind) => (
                <View key={ind}>
                  <Text style={styles.Snumber}>Step {val.number}</Text>
                  <Text style={styles.step}> {val.step}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  Stitle: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "green",
  },
  cardImage: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 20,
    // marginTop: -30,
  },

  Snumber: {
    fontWeight: "bold",
    fontSize: 18,
  },
  step: {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 12,
    marginVertical: 10,
  },
  table: {
    flexDirection: "row",
    justifyContent: "center",
  },
  name: {
    width: "35%",
    fontWeight: "bold",
    borderRightWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  amount: {
    width: "30%",
    borderRightWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  parcentage: {
    width: "25%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  favourite: {
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "flex-end",
    padding: 10,
    elevation: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    position: "absolute",
    flex: 1,
    zIndex: 1,
  },
});
