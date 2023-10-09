using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/rams")]
    public class RAMsController : ControllerBase
    {
        private readonly IRAMsRepository repository;

        public RAMsController(IRAMsRepository repository)
        {
            this.repository = repository;
        }   

        // GET /rams
        [HttpGet]
        public async Task<IEnumerable<RAMDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /rams/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<RAMDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /rams
        [HttpPost]
        public async Task<ActionResult<CreateRAMDto>> CreateItemAsync(CreateRAMDto createDto)
        {
            RAM item = new()
            {
                Type = createDto.Type,
                Size = createDto.Size,
                Velocity = createDto.Velocity,
                Serial_Number = createDto.Serial_Number,
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /rams/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateRAMDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Type = updateDto.Type;
            existingItem.Size = updateDto.Size;
            existingItem.Velocity = updateDto.Velocity;
            existingItem.Serial_Number = updateDto.Serial_Number;
            existingItem.Origen = updateDto.Origen;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /rams/{id}
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