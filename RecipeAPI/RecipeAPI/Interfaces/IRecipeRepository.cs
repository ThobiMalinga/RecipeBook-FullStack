using RecipeAPI.Models;

namespace RecipeAPI.Interfaces
{
    public interface IRecipeRepository
    { //Add comments explaining each method in the interface
        Task CreateRecipe(Recipe recipe);

        Task<List<Recipe>> GetRecipes();

        Task<Recipe?> GetRecipeById(int id);

        Task UpdateRecipe(Recipe recipe);

        Task DeleteRecipe(Recipe recipe);

    }
}
