using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IComputersRepository
    {
        Task<IEnumerable<Computer>> GetItemListAsync();
        Task<Computer> GetItemAsync(string id);
        Task CreateItemAsync(Computer item);
        Task UpdateItemAsync(Computer item);
        Task DeleteItemAsync(string id);
    }    
}