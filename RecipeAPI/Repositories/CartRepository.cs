using Microsoft.EntityFrameworkCore;
using RecipeAPI.Data;
using RecipeAPI.Interfaces;
using RecipeAPI.Models;

namespace RecipeAPI.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly RecipeContext _context;

        public CartRepository(RecipeContext context)
        {
            _context = context;
        }

        public async Task<List<Cart>> GetAllAsync()
        {
            return await _context.Carts
                .Include(c => c.Recipe)
                .ToListAsync();
        }

        public async Task<Cart> AddAsync(Cart item)
        {
            var existing = await _context.Carts
                .FirstOrDefaultAsync(c => item.Recipe != null && c.Recipe!.RecipeId == item.Recipe.RecipeId);

            if (existing != null)
            {
                existing.Quantity += item.Quantity;
                await _context.SaveChangesAsync();
                return existing;
            }

            if (item.Recipe != null)
            {
                _context.Attach(item.Recipe);
            }

            _context.Carts.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<Cart?> UpdateQuantityAsync(int id, int quantity)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null) return null;

            cart.Quantity = quantity;
            await _context.SaveChangesAsync();
            return cart;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null) return false;

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}