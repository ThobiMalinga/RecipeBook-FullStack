namespace RecipeAPI.DTOs
{
    public class UpdateRecipe
    {
        public string? RecipeName { get; set; }
        public string? RecipeImage { get; set; }
        public string? Ingredients { get; set; }
        public string? Instructions { get; set; }
    }
}
