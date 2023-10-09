using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/mouses")]
    public class MousesController : ControllerBase
    {
        private readonly IMousesRepository repository;

        public MousesController(IMousesRepository repository)
        {
            this.repository = repository;
        }   

        // GET /mouses
        [HttpGet]
        public async Task<IEnumerable<MouseDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /mouses/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MouseDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /mouses
        [HttpPost]
        public async Task<ActionResult<CreateMouseDto>> CreateItemAsync(CreateMouseDto createDto)
        {
            Mouse item = new()
            {
                Model = createDto.Model,
                Brand = createDto.Brand,
                Type = createDto.Type,
                Serial_Number = createDto.Serial_Number,
                Inventory_Number = createDto.Inventory_Number,
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /mouses/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateMouseDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Brand = updateDto.Brand;
            existingItem.Model = updateDto.Model;
            existingItem.Type = updateDto.Type;
            existingItem.Serial_Number = updateDto.Serial_Number;
            existingItem.Inventory_Number = updateDto.Inventory_Number;
            existingItem.Origen = updateDto.Origen;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /mouses/{id}
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