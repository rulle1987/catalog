using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/printers")]
    public class PrintersController : ControllerBase
    {
        private readonly IPrintersRepository repository;

        public PrintersController(IPrintersRepository repository)
        {
            this.repository = repository;
        }   

        // GET /printers
        [HttpGet]
        public async Task<IEnumerable<PrinterDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(printer => printer.AsDto());
            return items;
        }
        
        // GET /printers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PrinterDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /printers
        [HttpPost]
        public async Task<ActionResult<CreatePrinterDto>> CreateItemAsync(CreatePrinterDto createDto)
        {
            Printer item = new()
            {
                Model = createDto.Model,
                Brand = createDto.Brand,
                Serial_Number = createDto.Serial_Number,
                Inventory_Number = createDto.Inventory_Number,
                Origen = createDto.Origen
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /printers/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdatePrinterDto updateDto)
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
        
        // DELETE /printers/{id}
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