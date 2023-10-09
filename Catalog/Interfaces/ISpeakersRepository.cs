using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface ISpeakersRepository
    {
        Task<IEnumerable<Speaker>> GetItemListAsync();
        Task<Speaker> GetItemAsync(string id);
        Task CreateItemAsync(Speaker item);
        Task UpdateItemAsync(Speaker item);
        Task DeleteItemAsync(string id);
    }    
}