using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Catalog
{
    public interface IMotherBoardsRepository
    {
        Task<IEnumerable<MotherBoard>> GetItemListAsync();
        Task<MotherBoard> GetItemAsync(string id);
        Task CreateItemAsync(MotherBoard item);
        Task UpdateItemAsync(MotherBoard item);
        Task DeleteItemAsync(string id);
    }    
}