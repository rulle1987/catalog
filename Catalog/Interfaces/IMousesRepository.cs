using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IMousesRepository
    {
        Task<IEnumerable<Mouse>> GetItemListAsync();
        Task<Mouse> GetItemAsync(string id);
        Task CreateItemAsync(Mouse item);
        Task UpdateItemAsync(Mouse item);
        Task DeleteItemAsync(string id);
    }    
}