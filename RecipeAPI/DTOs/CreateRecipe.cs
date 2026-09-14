using RecipeAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace RecipeAPI.DTOs
{
    public class CreateRecipe
    {
        [Required]
        public required string RecipeName { get; set; }
        public string RecipeImage { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }

    }
}
