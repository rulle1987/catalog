using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Catalog
{
    [ApiController]
    [Route("api/networks")]
    public class NetworkController : ControllerBase
    {
        private readonly INetworkRepository repository;

        public NetworkController(INetworkRepository repository)
        {
            this.repository = repository;
        }   

        // GET /networks
        [HttpGet]
        public async Task<IEnumerable<NetworkDto>> GetItemListAsync()
        {
            var items = (await repository.GetItemListAsync())
                            .Select(item => item.AsDto());
            return items;
        }
        
        // GET /networks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<NetworkDto>> GetItemAsync(string id)
        {
            var item = await repository.GetItemAsync(id);
            if(item is null)
            {
                return NotFound();
            }
            return item.AsDto();
        }    

        // POST /networks
        [HttpPost]
        public async Task<ActionResult<CreateNetworkDto>> CreateNetworkAsync(CreateNetworkDto createDto)
        {
            Network item = new()
            {
                Network_Class = createDto.Network_Class,
                Dominio = createDto.Dominio,
                IPAddress = createDto.IPAddress,
                Mac = createDto.Mac,
                Mask = createDto.Mask,
                Get_Away = createDto.Get_Away,
                Prefered_DNS = createDto.Prefered_DNS,
                Alternative_DNS = createDto.Alternative_DNS,
                Proxy = createDto.Proxy,
                Mail_System = createDto.Mail_System,
                Mail_User = createDto.Mail_User
            };

            await repository.CreateItemAsync(item);

            return CreatedAtAction(nameof(GetItemAsync), new { id = item.Id }, item.AsDto());
        }

        // PUT /networks/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItemAsync(string id, UpdateNetworkDto updateDto)
        {
            var existingItem = await repository.GetItemAsync(id);

            if(existingItem is null)
            {
                return NotFound();
            }

            existingItem.Network_Class = updateDto.Network_Class;
            existingItem.Dominio = updateDto.Dominio;
            existingItem.IPAddress = updateDto.IPAddress;
            existingItem.Mac = updateDto.Mac;
            existingItem.Mask = updateDto.Mask;
            existingItem.Get_Away = updateDto.Get_Away;
            existingItem.Prefered_DNS = updateDto.Prefered_DNS;
            existingItem.Alternative_DNS = updateDto.Prefered_DNS;
            existingItem.Proxy = updateDto.Proxy;
            existingItem.Mail_System = updateDto.Mail_System;
            existingItem.Mail_User = updateDto.Mail_User;

            await repository.UpdateItemAsync(existingItem);

            return NoContent();
        }
        
        // DELETE /networks/{id}
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