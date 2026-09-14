using RecipeAPI.DTOs;
using RecipeAPI.Models;

namespace RecipeAPI.Mappers
{
    public static class RecipeMapper
    {
          public static Recipe ToEntity(this CreateRecipe createRecipe)
        {
            return new Recipe
            {
                RecipeName = createRecipe.RecipeName,
                RecipeImage = createRecipe.RecipeImage,
                Ingredients = createRecipe.Ingredients,
                Instructions = createRecipe.Instructions
            };
        }
        
    }
}
