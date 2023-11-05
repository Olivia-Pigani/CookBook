import { useRef } from "react";
import Recipe from "../../models/Recipe.js";
import Ingredient from "../../models/Ingredient.js";
import { useDispatch } from "react-redux";
import { postRecipe } from "./recipeSlice";
import { useNavigate } from "react-router-dom";
import style from "./Forms.module.css"

const Form = () => {
  const recetteNameRef = useRef();
  const descriptionRef = useRef();
  const timeCookingRef = useRef();
  const prepTimeRef = useRef();
  const servingsRef = useRef();
  const ingredientNameRef = useRef();
  const quantityRef = useRef();
  const unitRef = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddForm = async (e) => {
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

    dispatch(postRecipe(recette))
      console.log(recette)
    navigate("/")
  };

  return (
    <>
      <h1>form</h1>
      <form action="#" onSubmit={handleAddForm}>
        <div className={style.formStyle}>
        <div>
          <div className={style.firstLabels}>
            <label htmlFor="nameRecette">nom de la recette : </label>
            <label htmlFor="description">description :</label>
            <label htmlFor="timeCooking">temps de cuisson :</label>
            <label htmlFor="prepTime">temps de préparation :</label>
            <label htmlFor="servings">parts :</label>
          </div>

          <div className={style.firstLabels}>
            <label htmlFor="nameIngredient">nom de l'ingrédient :</label>
            <label htmlFor="quantity">quantité :</label>
            <label htmlFor="unit">unité :</label>
          </div>
        </div>

        <div>
          <div className={style.firstInputs}>
            <input type="text" name="nameRecette" ref={recetteNameRef} />
            <input type="text" name="description" ref={descriptionRef} />
            <input type="text" name="timeCooking" ref={timeCookingRef} />
            <input type="text" name="prepTime" ref={prepTimeRef} />
            <input type="text" name="servings" ref={servingsRef} />
          </div>

          <div className={style.firstInputs}>
            <input type="text" name="nameIngredient" ref={ingredientNameRef} />
            <input type="text" name="quantity" ref={quantityRef} />
            <input type="text" name="unit" ref={unitRef} />
          </div>
        </div>
        </div>
        <div>
          <button>Valider</button>
        </div>
      </form>
    </>
  );
};
export default Form;
