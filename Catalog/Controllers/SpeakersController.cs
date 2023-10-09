using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/speakers")]
    public class SpeakersController : ControllerBase
    {
        private readonly ISpeakersRepository repository;

        public SpeakersController(ISpeakersRepository repository)
        {
            this.repository = repository;
        }   

        // GET /speakers
        [HttpGet]
        public async Task<IEnumerable<SpeakerDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /speakers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<SpeakerDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /speakers
        [HttpPost]
        public async Task<ActionResult<CreateSpeakerDto>> CreateItemAsync(CreateSpeakerDto createDto)
        {
            Speaker item = new()
            {
                Brand = createDto.Brand,
                Model = createDto.Model,
                Serial_Number = createDto.Serial_Number,
                Inventory_Number = createDto.Inventory_Number,
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /speakers/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateSpeakerDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Brand = updateDto.Brand;
            existingItem.Model = updateDto.Model;
            existingItem.Serial_Number = updateDto.Serial_Number;
            existingItem.Inventory_Number = updateDto.Inventory_Number;
            existingItem.Origen = updateDto.Origen;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /speakers/{id}
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