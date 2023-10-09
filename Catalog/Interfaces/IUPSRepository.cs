using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IUPSRepository
    {
        Task<IEnumerable<UPS>> GetItemListAsync();
        Task<UPS> GetItemAsync(string id);
        Task CreateItemAsync(UPS item);
        Task UpdateItemAsync(UPS item);
        Task DeleteItemAsync(string id);
    }    
}