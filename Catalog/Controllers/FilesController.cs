using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/files")]
    public class FilesController : ControllerBase
    {
        private readonly IFilesRepository repository;

        public FilesController(IFilesRepository repository)
        {
            this.repository = repository;
        }   

        // GET /files
        [HttpGet]
        public async Task<IEnumerable<FileDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /files/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FileDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /files
        [HttpPost]
        public async Task<ActionResult<CreateFileDto>> CreateItemAsync([FromBody] CreateFileDto createDto)
        {
            File item = new()
            {
                Created = new DateTimeOffset(),
                Area = createDto.Area,
                Manager_Area = createDto.Manager_Area,
                Manager_Computer = createDto.Manager_Computer,
                Computer = createDto.Computer,
                MotherBoard = createDto.MotherBoard,
                Keyboard = createDto.Keyboard,
                Mouse = createDto.Mouse,
                Monitor = createDto.Monitor,
                Network = createDto.Network,
                Printer = createDto.Printer,
                Speaker = createDto.Speaker,
                Tower = createDto.Tower,
                UPS = createDto.UPS,
                hddItemsId = createDto.hddItemsId,
                ramItemsId = createDto.ramItemsId

            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /files/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateFileDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Created = updateDto.Created;
            existingItem.Area = updateDto.Area;
            existingItem.Manager_Area = updateDto.Manager_Area;
            existingItem.Manager_Computer = updateDto.Manager_Computer;
            existingItem.Computer = updateDto.Computer;
            existingItem.MotherBoard = updateDto.MotherBoard;
            existingItem.Monitor = existingItem.Monitor;
            existingItem.Keyboard = updateDto.Keyboard;
            existingItem.Mouse = updateDto.Mouse;
            existingItem.Network = updateDto.Network;
            existingItem.hddItemsId = updateDto.hddItemsId;
            existingItem.ramItemsId = updateDto.ramItemsId;
            existingItem.Printer = updateDto.Printer;
            existingItem.Speaker = updateDto.Speaker;
            existingItem.Tower = updateDto.Tower;
            existingItem.UPS = updateDto.UPS;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /files/{id}
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