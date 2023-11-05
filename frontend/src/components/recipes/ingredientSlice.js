import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// CRUD

export const postIngredient = createAsyncThunk(
  "ingredients/postIngredient",
  async (newIngredient) => {
    const user = localStorage.getItem("user"); // si il y a bien un user (voir dans authSlice)
    const response = await fetch(`http://127.0.0.1:3001/ingredients`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${user}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIngredient),
    });
    const data = await response.json();
    console.log(data);
    return {
      id: data.id,
      ...newIngredient,
    };
  }
);

export const fetchIngredients = createAsyncThunk(
  //GET all
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetch(`http://127.0.0.1:3001/ingredients`);
    const data = await response.json();
    console.log(data);
    const ingredients = [];
    for (const key in data) {
        ingredients.push({ id: key, ...data[key] });
    }
    return ingredients;
  }
);

//GET id
export const fetchIngredientById = createAsyncThunk(
  "ingredients/fetchIngredientById",
  async (selectedIngredient) => {
    const response = await fetch(
      `http://127.0.0.1:3001/ingredients/${selectedIngredient.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedIngredient),
      }
    );
    const data = await response.json();
    console.log(data);
    return selectedIngredient;
  }
);

//UPDATE
export const editIngredient = createAsyncThunk(
  "ingredients/editIngredient",
  async ({ ingredientId, ...newIngredient }) => {
    const user = localStorage.getItem("user");
    const response = await fetch(
      `http://127.0.0.1:3001/ingredients/${ingredientId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Basic ${user}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient),
      }
    );
    const data = await response.json();
    console.log(data);
    console.log(newIngredient);

    return { ingredientId, ...data };
  }
);

//DELETE
export const deleteIngredient = createAsyncThunk(
  "ingredients/deleteIngredient",
  async (ingredient) => {
    const user = localStorage.getItem("user");
    const response = await fetch(
      `http://127.0.0.1:3001/ingredients/${ingredient.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${user}`,
        },
      }
    );

    if (response.status === 200) {
      return ingredient;
    } else {
      return Promise.reject(new Error("La suppression a échoué"));
    }
  }
);

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    selectedIngredient: null, // selectionner un ingrédient selon son id
    formMode: "", // form action
  },

  reducers: {
    setSelectedIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      console.log(state.ingredients);
    });
    builder.addCase(postIngredient.fulfilled, (state, action) => {
      state.ingredients.push(action.payload);
      console.log(state.ingredients);
    });
    builder.addCase(deleteIngredient.fulfilled, (state, action) => {
      const ingredientId = action.payload.id;
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.id !== ingredientId);
      console.log(state.ingredients);
    });
    builder.addCase(editIngredient.fulfilled, (state, action) => {
      state.ingredients = [
        ...state.ingredients.filter((i) => i.id !== action.payload.id),
        action.payload,
      ];
      console.log(state.ingredients);
    });
  },
});
export const { setSelectedIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
