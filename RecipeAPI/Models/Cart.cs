namespace RecipeAPI.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public Recipe? Recipe { get; set; }
    }
}
