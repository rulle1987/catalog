using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IKeyboardsRepository
    {
        Task<IEnumerable<Keyboard>> GetItemListAsync();
        Task<Keyboard> GetItemAsync(string id);
        Task CreateItemAsync(Keyboard item);
        Task UpdateItemAsync(Keyboard item);
        Task DeleteItemAsync(string id);
    }    
}