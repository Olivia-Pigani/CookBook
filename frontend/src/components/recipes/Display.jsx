import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRecipes, fetchRecipes, setSelectedRecipe } from "./recipeSlice";

const Display = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const selectedRecipe = useSelector((state) => state.recipes.selectedRecipe);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  const handleUpdate = (recipe) => {
    dispatch(setSelectedRecipe(recipe));
    navigate(`/form/update/${recipe.id}`);
  };

  const handleDelete = (recipe) => {
    dispatch(deleteRecipes(recipe));
    navigate(`/form/delete/${recipe.id}`);
  };
  const showDetails = (recipe) => {
    dispatch(setSelectedRecipe(recipe));
    navigate(`/details/${recipe.id}`);
  };

  return (
    <>
      <h1>Recettes</h1>

      {/* pas de recette ? */}
      <div>
        {recipes.length === 0 ? (
          <p>Il n'y a pas de recettes.</p>
        ) : (
          // si il y a des recettes
          recipes.map((recipe) => (
            <div key={recipe.id}>
              <div>
                <div>
                  <span> {recipe.name}</span>
                  <span> {recipe.prepTime} min</span>
                  <span> {recipe.timeCooking} min</span>
                  <span> {recipe.servings} portions</span>
                </div>
              </div>

              <div>
                {/* si il y a un utilisateur connecté il pourra edit et delete */}
                {user && (
                  <>
                    <div>
                      <button onClick={() => handleUpdate(recipe)}>
                        mise à jour
                      </button>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(recipe)}>
                        supprimer
                      </button>
                    </div>
                  </>
                )}
                {/* par défaut on pourra voir les détails */}
                <div>
                  <button onClick={() => showDetails(recipe)}>détails</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default Display;
