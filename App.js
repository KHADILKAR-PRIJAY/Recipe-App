import React, { useState } from "react";
import { SafeAreaView, StatusBar, LogBox } from "react-native";
import Navigation from "./Src/Config/Navigation/Mainnavigation";
import firebase from "firebase";
import "firebase/firestore";

import { store } from "./Src/Store/Store";
import { Provider } from "react-redux";

//import firebase config from firebase file
import config from "./Src/Config/Firebase/firebase";
//for ignore yellow box
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
LogBox.ignoreAllLogs();

// connect Firebase with app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase
    .firestore()
    .settings({ experimentalForceLongPolling: true, merge: true }); // this is for to remove setting time warning..
}

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        {/* this is app main Navigation */}
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
