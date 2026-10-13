using Microsoft.EntityFrameworkCore;
using RecipeAPI.Models;

namespace RecipeAPI.Data
{
    public class RecipeContext : DbContext
    {
        public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) { }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Cart> Carts { get; set; }

        // Matches the schema of the original hand-written SQL tables, so migrations
        // reproduce the existing database instead of EF's defaults (nvarchar(max) etc.).
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>(recipe =>
            {
                recipe.Property(r => r.RecipeId).HasColumnName("RecipeID");
                recipe.Property(r => r.RecipeName).HasColumnType("varchar(255)").IsRequired();
                recipe.Property(r => r.RecipeImage).HasColumnType("varchar(255)").IsRequired(false);
                recipe.Property(r => r.Ingredients).HasColumnType("varchar(255)").IsRequired(false);
                recipe.Property(r => r.Instructions).HasColumnType("varchar(255)").IsRequired(false);

                recipe.HasData(RecipeSeedData.Recipes);
            });

            modelBuilder.Entity<Cart>(cart =>
            {
                cart.HasKey(c => c.Id).HasName("pk_Cart");
                cart.Property(c => c.ItemName).HasColumnType("varchar(255)").IsRequired();

                // Every cart item belongs to a recipe. Deleting a recipe that is
                // still in the cart is blocked (NO ACTION), as in the original schema.
                cart.HasOne(c => c.Recipe)
                    .WithMany()
                    .HasForeignKey("RecipeID")
                    .HasConstraintName("fk_Cart_Recipes")
                    .IsRequired()
                    .OnDelete(DeleteBehavior.NoAction);
            });
        }
    }
}
