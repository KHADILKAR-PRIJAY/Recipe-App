import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./../../../Screens//Home";
import Favourite from "../../../Screens/Favourite";
import Profile from "./../../../Screens/Profile";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Image } from "react-native";
import firebase from "firebase";

const Tab = createBottomTabNavigator();

function BottonNavigation() {
  let logout = (navigation) => {
    console.log(navigation);
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate("Welcome"));
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Menu"
        component={Home}
        options={({ route, navigation }) => ({
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitle: () => (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
                }}
              ></Text>
            </View>
          ),
          headerRight: () => (
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
                user Email
              </Text>
              <Image
                source={require("./../../../Images/profile.jpg")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
              />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => logout(navigation)}
            >
              <Entypo name="log-out" size={24} color="white" />
            </TouchableOpacity>
          ),
          animationEnabled: false,
          headerBackVisible: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={({ route, navigation }) => ({
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitle: () => (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
                }}
              ></Text>
            </View>
          ),
          headerRight: () => (
            <View style={{}}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              ></Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => logout(navigation)}
            >
              <Entypo name="log-out" size={24} color="white" />
            </TouchableOpacity>
          ),
          animationEnabled: false,
          headerBackVisible: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ route, navigation }) => ({
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
          headerTitle: () => (
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
                }}
              ></Text>
            </View>
          ),
          headerRight: () => (
            <View style={{}}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: 18,
                }}
              ></Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => logout(navigation)}
            >
              <Entypo name="log-out" size={24} color="white" />
            </TouchableOpacity>
          ),
          animationEnabled: false,
          headerBackVisible: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

export { BottonNavigation };
