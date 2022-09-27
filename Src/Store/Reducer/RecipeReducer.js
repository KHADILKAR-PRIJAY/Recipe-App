import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Recipe: [],
  favouriteRecipe: [],
  user: "",
};

export const RecipeSlice = createSlice({
  name: "Recipe",
  initialState,
  reducers: {
    getAllRecipe: (state, actions) => {
      state.Recipe = actions.payload;
    },
    GetFavouriteRecipe: (state, actions) => {
      state.favouriteRecipe = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllRecipe, GetFavouriteRecipe } = RecipeSlice.actions;

export default RecipeSlice.reducer;
