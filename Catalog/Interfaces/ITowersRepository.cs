using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface ITowersRepository
    {
        Task<IEnumerable<Tower>> GetItemListAsync();
        Task<Tower> GetItemAsync(string id);
        Task CreateItemAsync(Tower item);
        Task UpdateItemAsync(Tower item);
        Task DeleteItemAsync(string id);
    }    
}