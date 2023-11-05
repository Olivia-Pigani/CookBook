import { readFileSync, writeFileSync } from "fs";
import { resolve } from 'path';
import {v4 as uuiv4} from "uuid"


export default class RecipeDao {
    constructor(){
        // this signifie que chaque instance de ce dao pointera vers la meme database, chaque objet recipeDAO aura son propre file et recipes.
        this.file= resolve("./db/recipesdb.json"); // resolve indique que file est dans un path absolue bien précis
        this.recipes= [] //contient les recettes après chargement
        
    }

    // FILE

    readFileRecipes() {

        // il faut gérer le cas où le file est vide, sinon on aurait une erreur
        
        try{
            const file = readFileSync(this.file, { encoding: "utf-8" });
            this.recipes = file ? JSON.parse(file) : []
          } catch (error){
            console.error("erreur lors de la lecture du file recette")
          }
      



    }
    
    writeFileRecipes() {
        writeFileSync(this.file, JSON.stringify(this.recipes)); // conversion de obj js en json
    }


    // CRUD

    addARecipe(recipe){
        recipe.id = uuiv4() // ajoute un id à recipe
        this.recipes.push(recipe) // on push un obj dans l'array, un objet [{id, attrib1, attrib2}]
        this.writeFileRecipes()
        return recipe
    }


    getAllRecipes(){
        return this.recipes
    }

    getRecipeById(id){
        return this.recipes.find(r=>r.id === id) // find  {id, att1,att2}
    }

    updateARecipe(updatedRecipeData){
        let recipeIndex = this.recipes.findIndex(r=>r.id === updatedRecipeData.id)
        if(recipeIndex === -1){
            return false
        } else {
            this.recipes[recipeIndex] = {...this.recipes[recipeIndex],...updatedRecipeData}
            this.writeFileRecipes()
            return true
        }
    

    }

    deleteARecipe(id){
        const tailleDepart = this.recipes.length
       this.recipes = this.recipes.filter(r=>r.id !== id)
       const tailleSortie = this.recipes.length
       
       this.writeFileRecipes()

        return tailleSortie<tailleDepart // si true,a lors il y a eu un delete
       

    }


}
