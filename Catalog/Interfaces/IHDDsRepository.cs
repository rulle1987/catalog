using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IHDDsRepository
    {
        Task<IEnumerable<HDD>> GetItemListAsync();
        Task<HDD> GetItemAsync(string id);
        Task CreateItemAsync(HDD item);
        Task UpdateItemAsync(HDD item);
        Task DeleteItemAsync(string id);
    }    
}