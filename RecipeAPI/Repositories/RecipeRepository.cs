using RecipeAPI.Data;
using RecipeAPI.Interfaces;
using RecipeAPI.Models;

using Microsoft.EntityFrameworkCore;

namespace RecipeAPI.Repositories

{
    public class RecipeRepository : IRecipeRepository
    {
        //dependancy injection of the RecipeContext
        private readonly RecipeContext _context;

        public RecipeRepository(RecipeContext context)
        {
            _context = context;
        }

        public async Task<List<Recipe>> GetRecipes()
        {
            return await _context.Recipes.ToListAsync();
        }

        public async Task<Recipe?> GetRecipeById(int id)
        {
            return await _context.Recipes
                .FirstOrDefaultAsync(r => r.RecipeId == id);
        }

        public async Task<Recipe> CreateRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return recipe;
        }

        public async Task UpdateRecipe(Recipe recipe)
        {
            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRecipe(Recipe recipe)
        {
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }

        Task IRecipeRepository.CreateRecipe(Recipe recipe)
        {
            return CreateRecipe(recipe);
        }
    }
}
