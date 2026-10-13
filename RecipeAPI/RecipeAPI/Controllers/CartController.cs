using Microsoft.AspNetCore.Mvc;
using RecipeAPI.DTOs;
using RecipeAPI.Interfaces;
using RecipeAPI.Mappers;

namespace RecipeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<CartDto>>> GetAll()
        {
            var carts = await _cartRepository.GetAllAsync();
            return Ok(carts.Select(CartMapper.ToDto).ToList());
        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> Add([FromBody] CreateCart dto)
        {
            var cart = CartMapper.ToEntity(dto);
            var created = await _cartRepository.AddAsync(cart);
            return Ok(CartMapper.ToDto(created));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CartDto>> UpdateQuantity(int id, [FromBody] UpdateCart dto)
        {
            var updated = await _cartRepository.UpdateQuantityAsync(id, dto.Quantity);
            if (updated == null) return NotFound();
            return Ok(CartMapper.ToDto(updated));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _cartRepository.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}