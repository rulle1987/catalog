using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/motherboards")]
    public class MotherBoardsController : ControllerBase
    {
        private readonly IMotherBoardsRepository repository;

        public MotherBoardsController(IMotherBoardsRepository repository)
        {
            this.repository = repository;
        }   

        // GET /motherboards
        [HttpGet]
        public async Task<IEnumerable<MotherBoardDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /motherboards/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MotherBoardDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /motherboards
        [HttpPost]
        public async Task<ActionResult<CreateMotherBoardDto>> CreateItemAsync(CreateMotherBoardDto createDto)
        {
            MotherBoard item = new()
            {
                Name = createDto.Name,
                Manufacter = createDto.Manufacter,
                Product = createDto.Product,
                Micro = createDto.Micro,
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /motherboards/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateMotherBoardDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Name = updateDto.Name;
            existingItem.Manufacter = updateDto.Manufacter;
            existingItem.Product = updateDto.Product;
            existingItem.Micro  = updateDto.Micro;
            existingItem.Origen = updateDto.Origen;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /motherboards/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItemAsync(string id)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            await repository.DeleteItemAsync(id);

            return NoContent();
        }
    }
}