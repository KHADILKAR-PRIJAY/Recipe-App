import { configureStore } from "@reduxjs/toolkit";
import RecipeSlice from "./Reducer/RecipeReducer";
export const store = configureStore({
  reducer: {
    Recipe: RecipeSlice,
  },
});
