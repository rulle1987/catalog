using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/disks")]
    public class HDDsController : ControllerBase
    {
        private readonly IHDDsRepository repository;

        public HDDsController(IHDDsRepository repository)
        {
            this.repository = repository;
        }   

        // GET /disks
        [HttpGet]
        public async Task<IEnumerable<HDDDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(disk => disk.AsDto());
            return items;
        }
        
        // GET /disks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<HDDDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /disks
        [HttpPost]
        public async Task<ActionResult<CreateHDDDto>> CreateItemAsync(CreateHDDDto createDto)
        {
            HDD item = new()
            {
                Brand = createDto.Brand,
                Model = createDto.Model,
                Size = createDto.Size,
                Partitions = createDto.Partitions,
                Serial_Number = createDto.Serial_Number,                
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /disks/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateHDDDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Brand = updateDto.Brand;
            existingItem.Model = updateDto.Model;
            existingItem.Size = updateDto.Size;
            existingItem.Partitions = updateDto.Partitions;
            existingItem.Serial_Number = updateDto.Serial_Number;
            existingItem.Origen = updateDto.Origen;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /disks/{id}
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