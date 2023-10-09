using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IFilesRepository
    {
        Task<IEnumerable<File>> GetItemListAsync();
        Task<File> GetItemAsync(string id);
        Task CreateItemAsync(File item);
        Task UpdateItemAsync(File item);        
        Task DeleteItemAsync(string id);
    }    
}