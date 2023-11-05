/** les endpoints des routes vont utiliser les opérations de crud des dao
 * ajouter le middleware authentification
 * Il faut utiliser l'instance de la dao, donc l'importer de app vers ici et non pas la classe dao
 */

import express from "express";
//import RecipeDao from "../dao/recipeDao.js";
import Recipes from "../models/Recipe.js";
import {recipeDao} from "../app.js"
import { ingredientDao } from "../app.js";
import { authentification } from "../middleware/authentification.js";


const recipesRoute = express.Router();

// CRUD POST GET GETID PUT DELETE

recipesRoute.post("/", authentification, async (req, res) => {
  const { name, description, timeCooking, prepTime, servings, ingredients } =
    req.body; // req rpz la requete http du client ( obj js ), req.body rpz le corps dont les datas d'un formulaire
  // on destructure toutes les proprétés remplace : const person = {name:"bob",age:"42"} const name = person.name const age = person.age

try{
   const inProgressIngredients = await Promise.all(ingredients.map(async(ingredient)=>{
    return await ingredientDao.addAIngredient(ingredient)
   }))

   let newRecipe = new Recipes(
    null,
    name,
    description,
    timeCooking,
    prepTime,
    servings,
    inProgressIngredients
)

const addedRecipe = await recipeDao.addARecipe(newRecipe)
res.json(addedRecipe)
}
catch(error){
  res.status(500).json({ message: "Erreur lors de la création de la recette", error: error });
}


  


  // res.json(recipeDao.addARecipe(newRecipe)); // la réponse au client est envoyé en json, send convertie automatiquement en json()

  // console.log(newRecipe);
});

recipesRoute.get("/", (req, res) => {
  const recipes = recipeDao.getAllRecipes();
  res.json(recipes);
  console.log(recipes);
});

recipesRoute.get("/:id", (req, res) => {
  const recipeId = req.params.id; // params rpz les paramètres de route, id doit etre un int, saud uuid qui sont des strings
  const recipeToFind = recipeDao.getRecipeById(recipeId);
  console.log(recipeToFind);

  if (recipeToFind) {
    res.json(recipeToFind);
    console.log(recipeToFind);
  } else {
    res.status(404).json({ code: 404, message: "aucune recette touvée" });
  }
});

recipesRoute.put("/:id",authentification, (req, res) => {
  const recetteId = req.params.id;
  const updatedRecipeData = { id: recetteId, ...req.body }; // la nouvelle recette a l'id recetteID, ainsi que les data du formulaire
  const updatedRecette = recipeDao.updateARecipe(updatedRecipeData);

  if (updatedRecette) {
    res
      .status(200)
      .json({ code: 200, message: "Recette mise à jour avec succès" });
  } else {
    res
      .status(404)
      .json({
        code: 404,
        message: "Echec lors de la mise à jour de la recette",
      });
  }
});

recipesRoute.delete("/:id", authentification, (req, res) => {
  const recetteId = req.params.id;
  const deletedRecette = recipeDao.deleteARecipe(recetteId);

  if (deletedRecette) {
    // si la taille de sortie est inférieure à la taille de départ alors true
    res
      .status(200)
      .json({ code: 200, message: "La recette a été supprimée avec succès" });
  } else {
    res
      .status(404)
      .json({ code: 404, message: "La recette n'a pas été supprimée" });
  }
});
export default recipesRoute;
