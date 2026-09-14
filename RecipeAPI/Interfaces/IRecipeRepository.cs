using RecipeAPI.Models;

namespace RecipeAPI.Interfaces
{
    public interface IRecipeRepository
    {
        Task CreateRecipe(Recipe recipe);

        Task<List<Recipe>> GetRecipes();

        Task<Recipe?> GetRecipeById(int id);

        Task UpdateRecipe(Recipe recipe);

        Task DeleteRecipe(Recipe recipe);

    }
}
