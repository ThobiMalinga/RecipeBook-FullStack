namespace RecipeAPI.DTOs
{
    public class CartDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public int RecipeId { get; set; }
        public string RecipeName { get; set; } = string.Empty;
        public string? RecipeImage { get; set; }
        public string Ingredients { get; set; } = string.Empty;
    }
}