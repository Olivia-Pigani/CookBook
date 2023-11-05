import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./components/auth/authSlice";
import recipeSlice from "./components/recipes/recipeSlice.js"
import ingredientSlice from "./components/recipes/ingredientSlice";

export default configureStore({
    reducer:{
        auth:authSlice,
        recipes:recipeSlice,
        ingredients:ingredientSlice
    }
})