using Microsoft.EntityFrameworkCore;
using RecipeAPI.Models;

namespace RecipeAPI.Data
{
    public class RecipeContext : DbContext
    {
        public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) { }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Cart> Carts { get; set; }

    }
}
