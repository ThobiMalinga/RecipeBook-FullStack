namespace RecipeAPI.Models
{
    public class Recipe
    {
        public int RecipeId { get; set; }
        public required string RecipeName { get; set; }
        public string RecipeImage { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }
    }
}
