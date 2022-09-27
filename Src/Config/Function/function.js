import firebase from "firebase";
import axios from "axios";

let getRecipes = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      url: "https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&addRecipeNutrition=true&apiKey=124253b2c4ac45d3afe88ab8878b82aa",
    };

    axios
      .request(options)
      .then(function (response) {
        resolve(response.data.results);
      })
      .catch(function (error) {
        console.error("message", error.message);
      });
  });
};

let FavouriteRecipes = () => {
  return new Promise((resolve, reject) => {
    try {
      let allFavouriteRecipe = [];
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid, "fnjn");

        firebase
          .firestore()
          .collection("allfavourite")
          .doc(user.uid)
          .collection(user.uid)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.data());
              // doc.data() is never undefined for query doc snapshots
              allFavouriteRecipe.push(doc.data());
            });
            resolve(allFavouriteRecipe);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
        // firebase
        //   .database()
        //   .ref("/")
        //   .child(`allfavourite/${user.uid}`)
        //   .on("value", function (snapshot) {
        //     snapshot.forEach(function (childSnapshot) {
        //       if (childSnapshot.exists()) {
        //         var childData = childSnapshot.val();
        //         allFavouriteRecipe.push(childData);
        //       }
        //     });
        //   });
      });
    } catch (error) {
      console.log(error, "error==============>");
    }
  });
};

export { getRecipes, FavouriteRecipes };
