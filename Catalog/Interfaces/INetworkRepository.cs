using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface INetworkRepository
    {
        Task<IEnumerable<Network>> GetItemListAsync();
        Task<Network> GetItemAsync(string id);
        Task CreateItemAsync(Network item);
        Task UpdateItemAsync(Network item);
        Task DeleteItemAsync(string id);
    }    
}