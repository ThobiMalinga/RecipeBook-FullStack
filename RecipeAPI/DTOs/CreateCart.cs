using RecipeAPI.Models;

namespace RecipeAPI.DTOs
{
    public class CreateCart
    {
        //public required string ItemName { get; set; }
        //public int RecipeId { get; set; }
        //public int Quantity { get; set; }

        public int Id { get; set; } 
        public string itemName { get; set; }
        public int quantity { get; set; }
        public int recipeId { get; set; }
        public string recipeName { get; set; }
        public string? recipeImage { get; set; }
        public string? ingredients { get; set; }
    }
}
