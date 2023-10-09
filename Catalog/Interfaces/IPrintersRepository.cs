using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IPrintersRepository
    {
        Task<IEnumerable<Printer>> GetItemListAsync();
        Task<Printer> GetItemAsync(string id);
        Task CreateItemAsync(Printer item);
        Task UpdateItemAsync(Printer item);
        Task DeleteItemAsync(string id);
    }    
}