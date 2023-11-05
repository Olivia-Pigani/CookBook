import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import {v4 as uuiv4} from "uuid"


export default class IngredientDao {
  constructor() {
    this.file = resolve("./db/ingredientsdb.json");
    this.ingredients = [];
  }

  // FILE

  readFileIngredients() {
   
    try{
      const file = readFileSync(this.file, { encoding: "utf-8" });
      this.ingredients = file ? JSON.parse(file) : []
    } catch (error){
      console.error("erreur lors de la lecture du file ingrédient")
    }

    


  

  }

  writeFileIngredients() {
    writeFileSync(this.file, JSON.stringify(this.ingredients)); // conversion de obj js en json
  }

  // CRUD

  addAIngredient(ingredient) {
    ingredient.id = uuiv4()
    this.ingredients.push(ingredient);
    this.writeFileIngredients();
    return ingredient;
  }

  getAllIngredients() {
    return this.ingredients;
  }

  getIngredientById(id) {
    return this.ingredients.find((i) => i.id === id);
  }

  updateAnIngredient(updatedIngredient) {
    const ingredientIndex = this.ingredients.findIndex(
      (i) => i.id === updatedIngredient.id
    ); // findindex cherche l'index dans le array
    if (ingredientIndex === -1) {
      // 0 est l'index 0, mais -1 signifie qu'il y a rien
      return false;
    } else {
      this.ingredients[ingredientIndex] = {...this.ingredients[ingredientIndex],...updatedIngredient,}; // on modifie un objet {} via l'index bien particulier de l'array ingredients, 1 : on copie colle les valeurs à l'instant t / 2 : on fait une maj des nouvelles valeurs
      this.writeFileIngredients();
      return true;
    }
  }

  deleteAnIngredient(id) {
    const tailleDepart = this.ingredients.length
    this.ingredients = this.ingredients.filter((r) => r.id !== id);
    const tailleSortie = this.ingredients.length

    this.writeFileIngredients();


    return tailleSortie<tailleDepart
  }
}
