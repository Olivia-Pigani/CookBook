import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// CRUD

export const postRecipe = createAsyncThunk(
  "recipes/postRecipe",
  async (newRecipe) => {
    const user = localStorage.getItem("user"); // si il y a bien un user (voir dans authSlice)
    const response = await fetch(`http://127.0.0.1:3001/recipes`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${user}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
    const data = await response.json();
    console.log(data);
    return {
      id: data.id,
      ...newRecipe,
    };
  }
);

export const fetchRecipes = createAsyncThunk(
  //GET all
  "recipes/fetchRecipes",
  async () => {
    const response = await fetch(`http://127.0.0.1:3001/recipes`);
    const data = await response.json();
    console.log(data);
    const recipes = [];
    for (const key in data) {
      recipes.push({ id: key, ...data[key] });
    }
    return recipes;
  }
);

//GET id
export const fetchRecipesById = createAsyncThunk(
  "recipes/fetchRecipesById",
  async (selectedRecipe) => {
    const response = await fetch(
      `http://127.0.0.1:3001/recipes/${selectedRecipe.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRecipe),
      }
    );
    const data = await response.json();
    console.log(data);
    return selectedRecipe;
  }
);

//UPDATE
export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async ({ recipeId, ...newRecipe }) => {
    const user = localStorage.getItem("user");
    const response = await fetch(
      `http://127.0.0.1:3001/recipes/${recipeId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Basic ${user}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(newRecipe);

    return { recipeId, ...data };
  }
);

//DELETE
export const deleteRecipes = createAsyncThunk(
  "recipes/deleteRecipes",
  async (recipe) => {
    const user = localStorage.getItem("user");
    const response = await fetch(
      `http://127.0.0.1:3001/recipes/${recipe.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${user}`,
        },
      }
    );

    if (response.status === 200) {
      return recipe;
    } else {
      return Promise.reject(new Error("La suppression a échoué"));
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    selectedRecipe: null, // selectionner une recette selon son id
    formMode: "", // form action
  },

  reducers: {
    setSelectedRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
      console.log(state.recipes);
    });
    builder.addCase(postRecipe.fulfilled, (state, action) => {
      state.recipes.push(action.payload);
      console.log(state.recipes);
    });
    builder.addCase(deleteRecipes.fulfilled, (state, action) => {
      const recipeId = action.payload.id;
      state.recipes = state.recipes.filter((recipe) => recipe.id !== recipeId);
      console.log(state.recipes);
    });
    builder.addCase(editRecipe.fulfilled, (state, action) => {
      state.recipes = [
        ...state.recipes.filter((r) => r.id !== action.payload.id),
        action.payload,
      ];
      console.log(state.recipes);
    });
  },
});
export const { setSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
