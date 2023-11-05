import recipesRoute from "./routes/recipesRoute.js"
import ingredientRoute from "./routes/ingredientRoute.js"
import express from "express"
import cors from "cors"
import IngredientDao from "./dao/IngredientDao.js"
import RecipeDao from "./dao/RecipeDao.js"
import { authentification } from "./middleware/authentification.js"


const app = express()
const port = 3001
export const ingredientDao = new IngredientDao()
export const recipeDao = new RecipeDao()

app.use(cors())
app.use(express.json())


app.use("/recipes",recipesRoute)
app.use("/ingredients",ingredientRoute)

app.post('/authenticate', authentification,(req,res)=>{
    console.log(" il y a eu une tentative d'authentification")
})


app.listen(port,()=>{
    //readFile functions sont dispo avant les requetes
    ingredientDao.readFileIngredients()
    recipeDao.readFileRecipes()
    console.log(`le serveur a démarré sur http://127.0.0.1:${port}`);
})