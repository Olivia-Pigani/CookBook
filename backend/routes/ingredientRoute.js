import express from "express";
import Ingredients from "../models/Ingredient.js";
import { ingredientDao } from "../app.js";
import { authentification } from "../middleware/authentification.js";

const ingredientRoute = express.Router();

// CRUD POST GET GETID PUT DELETE

ingredientRoute.post("/", (req, res) => {
  const { name, quantity, unit } = req.body;

  let newIngredient = new Ingredients(null, name, quantity, unit);

  res.json(ingredientDao.addAIngredient(newIngredient));

  console.log(newIngredient);
});

ingredientRoute.get("/", (req, res) => {
  const ingredients = ingredientDao.getAllIngredients();
  res.json(ingredients);
  console.log(ingredients);
});

ingredientRoute.get("/:id", (req, res) => {
  const ingredientId = req.params.id; // params rpz les paramètres de route, id doit etre un int, mais vu qu'il y a des uuid qui sont des string : sert à rien
  const ingredientToFind = ingredientDao.getIngredientById(ingredientId);
  console.log(ingredientToFind);

  if (ingredientToFind) {
    res.json(ingredientToFind);
    console.log(ingredientToFind);
  } else {
    res.status(404).json({ code: 404, message: "aucun ingrédient touvé" });
  }
});

ingredientRoute.put("/:id", authentification, (req, res) => {
  const ingredientId = req.params.id;
  const updatedIngredientData = { id: ingredientId, ...req.body }; // la nouvelle recette a l'id recetteID, ainsi que les data du formulaire
  const updatedIngredient = ingredientDao.updateAnIngredient(
    updatedIngredientData
  );

  if (updatedIngredient) {
    res
      .status(200)
      .json({ code: 200, message: "Ingredient mise à jour avec succès" });
  } else {
    res.status(404).json({
      code: 404,
      message: "Echec lors de la mise à jour de l'ingredient",
    });
  }
});

ingredientRoute.delete("/:id", authentification, (req, res) => {
  const ingredientId = req.params.id;
  const deletedIngredient = ingredientDao.deleteAnIngredient(ingredientId);

  if (deletedIngredient) {
    res
      .status(200)
      .json({ code: 200, message: "L'ingrédient a été supprimé avec succès" });
  } else {
    res
      .status(404)
      .json({ code: 404, message: "L'ingrédient n'a pas été supprimé" });
  }
});
export default ingredientRoute;
