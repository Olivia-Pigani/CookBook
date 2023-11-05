import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Ingredient from "../../models/Ingredient";
import Recipe from "../../models/Recipe";
import { editRecipe } from "./recipeSlice";

const FormUpdate = () => {
  const recetteNameRef = useRef();
  const descriptionRef = useRef();
  const timeCookingRef = useRef();
  const prepTimeRef = useRef();
  const servingsRef = useRef();
  const ingredientNameRef = useRef();
  const quantityRef = useRef();
  const unitRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRecipe = useSelector(state=>state.recipes.selectedRecipe)

  const handleEditForm = async (e) => {
    e.preventDefault();


    const ingredient = new Ingredient(
        ingredientNameRef.current.value,
        quantityRef.current.value,
        unitRef.current.value
      );

    const recette = new Recipe(
      recetteNameRef.current.value,
      descriptionRef.current.value,
      timeCookingRef.current.value,
      prepTimeRef.current.value,
      servingsRef.current.value,
      [ingredient]
    );

    dispatch(editRecipe({recette}))
      console.log(recette)
    navigate("/")




  };

  return (
    <>
      <>
        <h1>Mise à jour de la recette</h1>
        <form action="#" onSubmit={handleEditForm}>
          <div>
            <div>
              <label htmlFor="nameRecette">nom de la recette : </label>
              <label htmlFor="description">description :</label>
              <label htmlFor="timeCooking">temps de cuisson :</label>
              <label htmlFor="prepTime">temps de préparation :</label>
              <label htmlFor="servings">parts :</label>
            </div>

            <div>
              <label htmlFor="nameIngredient">nom de l'ingrédient :</label>
              <label htmlFor="quantity">quantité :</label>
              <label htmlFor="unit">unité :</label>
            </div>
          </div>

          <div>
            <div>
              <input type="text" name="nameRecette" ref={recetteNameRef} defaultValue={selectedRecipe.nameRecette} />
              <input type="text" name="description" ref={descriptionRef} defaultValue={selectedRecipe.description} />
              <input type="text" name="timeCooking" ref={timeCookingRef} defaultValue={selectedRecipe.timeCooking} />
              <input type="text" name="prepTime" ref={prepTimeRef} defaultValue={selectedRecipe.prepTime} />
              <input type="text" name="servings" ref={servingsRef} defaultValue={selectedRecipe.servings} />
            </div>

            <div>
              <input
                type="text"
                name="nameIngredient"
                ref={ingredientNameRef}
               defaultValue={selectedRecipe.nameIngredient}/>
              <input type="text" name="quantity" ref={quantityRef} defaultValue={selectedRecipe.quantity} />
              <input type="text" name="unit" ref={unitRef} defaultValue={selectedRecipe.unit} />
            </div>
          </div>

          <div>
            <button>Valider</button>
          </div>
        </form>
      </>
    </>
  );
};
export default FormUpdate;
