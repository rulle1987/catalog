using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IPruebasRepository
    {
        Task<IEnumerable<Prueba>> GetItemListAsync();
        Task<Prueba> GetItemAsync(string id);
        Task CreateItemAsync(Prueba item);
        Task UpdateItemAsync(Prueba item);
        Task DeleteItemAsync(string id);
    }    
}