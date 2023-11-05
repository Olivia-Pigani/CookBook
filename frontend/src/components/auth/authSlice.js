const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const postSignIn = createAsyncThunk(
  "auth/postSignIn",
  async ({ login, password }) => {
    console.log("login : " + login + " " + "password : " + password); // string
    const base64Credentials = btoa(`${login}:${password}`); // bytes
    console.log(base64Credentials);

    const response = await fetch("http://127.0.0.1:3001/authenticate", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });

    console.log(response.status);

    if (response.status === 200) {
      localStorage.setItem("user", base64Credentials); // on met "user" dans le local storage, nécessaire pour le recipeSlice
      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", data);
      setAuthMode("Se déconnecter");
      return base64Credentials;
    } else {
      setAuthMode("s'authentifier");
      throw new Error("Authentification échouée");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authMode: "S'identifier",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOutAction(state, action) {
      state.user = null;
      localStorage.removeItem("user");
      state.authMode = "S'identifier";
    },
    setAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignIn.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    });
  },
});

export const { setAuthMode, logOutAction, setUser } = authSlice.actions;
export default authSlice.reducer;
