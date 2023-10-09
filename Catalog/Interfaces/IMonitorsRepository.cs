using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IMonitorsRepository
    {
        Task<IEnumerable<Monitor>> GetItemListAsync();
        Task<Monitor> GetItemAsync(string id);
        Task CreateItemAsync(Monitor item);
        Task UpdateItemAsync(Monitor item);
        Task DeleteItemAsync(string id);
    }    
}