using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/ups")]
    public class UPSController : ControllerBase
    {
        private readonly IUPSRepository repository;

        public UPSController(IUPSRepository repository)
        {
            this.repository = repository;
        }   

        // GET /ups
        [HttpGet]
        public async Task<IEnumerable<UPSDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /ups/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UPSDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /ups
        [HttpPost]
        public async Task<ActionResult<CreateUPSDto>> CreateItemAsync(CreateUPSDto createDto)
        {
            UPS item = new()
            {                
                Brand = createDto.Brand,
                Serial_Number = createDto.Serial_Number,
                Inventory_Number = createDto.Inventory_Number,                
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /ups/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateUPSDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Brand = updateDto.Brand;
            existingItem.Serial_Number = updateDto.Serial_Number;
            existingItem.Inventory_Number = updateDto.Inventory_Number;
            existingItem.Origen = updateDto.Origen;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /ups/{id}
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