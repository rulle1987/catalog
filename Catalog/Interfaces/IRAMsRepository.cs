using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IRAMsRepository
    {
        Task<IEnumerable<RAM>> GetItemListAsync();
        Task<RAM> GetItemAsync(string id);
        Task CreateItemAsync(RAM item);
        Task UpdateItemAsync(RAM item);
        Task DeleteItemAsync(string id);
    }    
}