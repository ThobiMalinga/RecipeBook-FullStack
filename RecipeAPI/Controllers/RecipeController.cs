using Microsoft.AspNetCore.Mvc;
using RecipeAPI.DTOs;
using RecipeAPI.Interfaces;
using RecipeAPI.Models;
using RecipeAPI.Mappers;


namespace RecipeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;

        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecipes()
        {
            var recipes = await _recipeRepository.GetRecipes();

            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipeById(int id)
        {
            var recipe = await _recipeRepository.GetRecipeById(id);

            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe);
        }


        //mapper 
        [HttpPost]
        public async Task<IActionResult> CreateRecipe(CreateRecipe dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                Recipe recipe = dto.ToEntity();
               await _recipeRepository.CreateRecipe(recipe);
                //return Ok(recipe);
                return CreatedAtAction(nameof(GetRecipeById), new { id = recipe.RecipeId }, recipe);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);

            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(int id, Recipe recipe)
        { 

            try
            {
                var existing = await _recipeRepository.GetRecipeById(id);
                if (existing == null)
                    return NotFound(false);

                existing.RecipeName = recipe.RecipeName;
                existing.RecipeImage = recipe.RecipeImage;
                existing.Ingredients = recipe.Ingredients;
                existing.Instructions = recipe.Instructions;

                await _recipeRepository.UpdateRecipe(existing);
                return Ok(existing);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            try
            {
                var recipe = await _recipeRepository.GetRecipeById(id);

                if (recipe == null)
                {
                    return NotFound(false);
                }

                await _recipeRepository.DeleteRecipe(recipe);

                return Ok(true);
            }
            catch (Exception)
            {
                return StatusCode(500, false);
            }
        }

    }
}
