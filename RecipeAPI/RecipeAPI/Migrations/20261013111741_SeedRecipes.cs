using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RecipeAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedRecipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Recipes",
                columns: new[] { "RecipeID", "Ingredients", "Instructions", "RecipeImage", "RecipeName" },
                values: new object[,]
                {
                    { 1, "400g spaghetti,200g pancetta or bacon,4 eggs,100g Parmesan cheese,Salt and black pepper,2 cloves garlic", "Cook spaghetti according to package directions,Fry pancetta until crispy,Beat eggs with grated Parmesan,Drain pasta and mix with pancetta,Remove from heat and stir in egg mixture,Season with salt and pepper,Serve immediately", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiZuXvUPIs4I6w64PeRs1exfx0KO5xStab4w&s", "Spaghetti Carbonara" },
                    { 2, "400g chicken, sliced,2 tbsp green curry paste,400ml coconut milk,1 zucchini, sliced, 1 green pepper, sliced,1 cup green beans,1 onion, sliced,1 tbsp fish sauce,1 tsp sugar,Fresh basil", "Sauté onions in oil,Add curry paste and chicken,Stir in coconut milk,Add vegetables and simmer,Season with fish sauce and sugar,Add basil and serve with rice", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQyYRr7GDRNTcr6nWBO-L39NDP-bPsST-iQ&s", "Thai Green Curry" },
                    { 3, "400g fettuccine,2 chicken breasts (sliced),2 tbsp butter,2 cloves garlic (minced),250ml heavy cream,100g Parmesan cheese (grated),Salt and black pepper,Fresh parsley (chopped)", "Cook fettuccine, In a pan, melt butter and sauté garlic, Add chicken slices, Pour in heavy cream,Stir in Parmesan cheese until sauce thickens,Toss pasta in the sauce,season with salt and pepper,Garnish with parsley and serve immediately", "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80", "Chicken Alfredo Pasta" },
                    { 13, "Water, Salt and Maize meal add Dube", "Boil water, pour maize meal into the boiling water, add salt and stir until it's well mixed", "https://th.bing.com/th/id/OIP.5NOoMZGGuk7--27jrXQbXQHaI0?w=147&h=180&c=7&r=0&o=7&pid=1.7&rm=3", "Uphuthu" },
                    { 14, "Mince\nWater\nBBQ Sauce", "Follow the instructions", "https://tse4.mm.bing.net/th/id/OIP.htFWj2silVdMe9BuMeHWOgHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", "Mince balls" },
                    { 18, "400g beef strips, tbsp soy sauce, tbsp oyster sauce, 1 tbsp cornflour, 1 red bell pepper, sliced, green bell pepper, sliced, 1 onion, sliced, 2 cloves garlic, minced, 1 tbsp vegetable oil, Salt and pepper", "Sauté onions in oil, Add curry paste and chicken, Stir in coconut milk, Add vegetables and simmer, Season with fish sauce and sugar Add basil and serve with rice", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQQyYRr7GDRNTcr6nWBO-L39NDP-bPsST-iQ&s", "Beef Stri Fry" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Recipes",
                keyColumn: "RecipeID",
                keyValue: 18);
        }
    }
}
