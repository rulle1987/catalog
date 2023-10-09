using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/prueba")]
    public class PruebaController : ControllerBase
    {
        private readonly IPruebasRepository repository;
        private readonly IComputersRepository repositoryComputer;

        public PruebaController(IPruebasRepository repository, IComputersRepository repositoryComputer)
        {
            this.repository = repository;
            this.repositoryComputer = repositoryComputer;
        }   

        // GET /ups
        [HttpGet]
        public async Task<IEnumerable<PruebaDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /ups/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PruebaDto>> GetItemAsync(string id)
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
        public async Task<ActionResult<CreatePruebaDto>> CreateItemAsync(Prueba prueba)
        {
            Prueba item = new()
            {                
                Computer = prueba.Computer,
                Items = prueba.Items
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /ups/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdatePruebaDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Computer = updateDto.Computer;
            existingItem.Items = updateDto.Items;

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