using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/monitors")]
    public class MonitorsController : ControllerBase
    {
        private readonly IMonitorsRepository repository;

        public MonitorsController(IMonitorsRepository repository)
        {
            this.repository = repository;
        }   

        // GET /monitors
        [HttpGet]
        public async Task<IEnumerable<MonitorDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /monitors/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MonitorDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /monitors
        [HttpPost]
        public async Task<ActionResult<CreateMonitorDto>> CreateItemAsync(CreateMonitorDto createDto)
        {
            Monitor item = new()
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

        // PUT /monitors/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateMonitorDto updateDto)
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
        
        // DELETE /monitors/{id}
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