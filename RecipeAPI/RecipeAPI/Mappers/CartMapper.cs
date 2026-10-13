using RecipeAPI.DTOs;
using RecipeAPI.Models;

namespace RecipeAPI.Mappers
{
    public static class CartMapper
    {
        public static Cart ToEntity(this CreateCart createCart)
        {
            return new Cart
            {
                ItemName = createCart.itemName,
                Quantity = createCart.quantity,
                Recipe = new Recipe
                {
                    RecipeId = createCart.recipeId,
                    RecipeName = createCart.recipeName,
                    RecipeImage = createCart.recipeImage,
                    Ingredients = createCart.ingredients
                }
            };
        }

        public static CartDto ToDto(this Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                ItemName = cart.ItemName,
                Quantity = cart.Quantity,
                RecipeId = cart.Recipe?.RecipeId ?? 0,
                RecipeName = cart.Recipe?.RecipeName ?? string.Empty,
                RecipeImage = cart.Recipe?.RecipeImage,
                Ingredients = cart.Recipe?.Ingredients ?? string.Empty
            };
        }
    }
}