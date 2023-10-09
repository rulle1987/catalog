using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/computers")]
    public class ComputersController : ControllerBase
    {
        private readonly IComputersRepository repository;

        public ComputersController(IComputersRepository repository)
        {
            this.repository = repository;
        }   

        // GET /computers
        [HttpGet]
        public async Task<IEnumerable<ComputerDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /computers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ComputerDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /computers
        [HttpPost]
        public async Task<ActionResult<CreateComputerDto>> CreateItemAsync(CreateComputerDto createDto)
        {
            Computer item = new()
            {                
                Computer_Name = createDto.Computer_Name,
                Operative_System = createDto.Operative_System,
                Service_Pack = createDto.Service_Pack,
                Antivirus = createDto.Antivirus,                
                Serial_Number = createDto.Serial_Number,
                Inventory_Number = createDto.Inventory_Number,
                Sealed = createDto.Sealed,
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /computers/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateComputerDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Computer_Name = updateDto.Computer_Name;
            existingItem.Operative_System = updateDto.Operative_System;
            existingItem.Service_Pack = updateDto.Service_Pack;
            existingItem.Antivirus = updateDto.Antivirus;
            existingItem.Serial_Number = updateDto.Serial_Number;
            existingItem.Inventory_Number = updateDto.Inventory_Number;
            existingItem.Sealed = updateDto.Sealed;
            existingItem.Origen = updateDto.Origen;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /computers/{id}
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