using RecipeAPI.Models;

namespace RecipeAPI.Interfaces
{
    public interface ICartRepository
    {
        Task<List<Cart>> GetAllAsync();
        Task<Cart> AddAsync(Cart item);
        Task<Cart?> UpdateQuantityAsync(int id, int quantity);
        Task<bool> DeleteAsync(int id);
    }
}