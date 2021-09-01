import React,{useContext} from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import uuidv4 from 'uuid/dist/v4'
import { RecipeContext } from './App'

export default function RecipeEdit({ recipe }) {
    const { handleRecipeChange , handleRecipeSelect } = useContext(RecipeContext);

    function handleChange(changes) {
        handleRecipeChange(recipe.id, { ...recipe, ...changes });
    }
    function handleIngredientChange(id, ingredient) {
        const newIngredient = [...recipe.ingredients];
        const index = newIngredient.findIndex(i => i.id === id)
        newIngredient [index] = ingredient
        handleChange({ingredients: newIngredient})
      };
  function handleIngredientAdd() {
      const newIngredient = {
          id: uuidv4(),
          name: '',
          amount:''

      }
      handleChange({ingredients: [...recipe.ingredients, newIngredient]})
    }
    function handleIngredientDelete(id) {
        handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id)})
    }
    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-container"> 
                <button onClick={() => handleRecipeSelect(undefined)} className="btn recipe-edit__remove-button">&times;</button>
            </div> 
            <div className="recipe-edit__deails-grid">
                <label className="recipe-edit__label" htmlFor="name">Name</label>
                <input className="recipe-edit__input" type="text" name="name" id="name" value={recipe.name} onChange={e => handleChange({name: e.target.value})} 
                   />
                <label className="recipe-edit__label" htmlFor="cookTime">Cook Time</label>
                <input className="recipe-edit__input" value={recipe.cookTime}  onChange={e => handleChange({cookTime: e.target.value})}  type="text" name="cookTime" id="cookTime" />
                <label className="recipe-edit__label" htmlFor="servings">Servings</label>
                <input className="recipe-edit__input" value={recipe.servings}  onChange={e => handleChange({servings: parseInt(e.target.value) || ''})}   type="number" min="1" name="servings" id="servings" />
                <label htmlFor="instructions">Instructions</label>
                <textarea className="recipe-edit__input"value={recipe.instructions}  onChange={e => handleChange({instructions: e.target.value})}   name="instructions" id="instructions"></textarea>
            </div>
            <br />
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid"> 
            <div>Name</div>
            <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                        ingredient={ ingredient}/>
                ))}
            
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button onClick={() =>  handleIngredientAdd()} className="btn btn--primary">Add Ingredient</button>
            </div>
        </div>
    )
}
