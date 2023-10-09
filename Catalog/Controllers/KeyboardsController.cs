using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/keyboards")]
    public class KeyboardsController : ControllerBase
    {
        private readonly IKeyboardsRepository repository;

        public KeyboardsController(IKeyboardsRepository repository)
        {
            this.repository = repository;
        }   

        // GET /keyboards
        [HttpGet]
        public async Task<IEnumerable<KeyboardDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /keyboards/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<KeyboardDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /keyboards
        [HttpPost]
        public async Task<ActionResult<CreateKeyboardDto>> CreateItemAsync(CreateKeyboardDto createDto)
        {
            Keyboard item = new()
            {
                Model = createDto.Model,
                Brand = createDto.Model,
                Type = createDto.Type,
                Serial_Number = createDto.Serial_Number,
                Inventory_Number = createDto.Inventory_Number,
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /keyboards/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateKeyboardDto updateDto)
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
        
        // DELETE /keyboards/{id}
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