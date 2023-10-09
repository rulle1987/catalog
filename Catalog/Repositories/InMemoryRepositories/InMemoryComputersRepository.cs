using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog
{
    public class InMemoryComputersRepository : IComputersRepository
    {
        private readonly List<Computer> items = new()
        {
            new Computer { Computer_Name = "Dianelys-PC", Operative_System = "Windows XP", Service_Pack = "Service Pck 3", Antivirus = "NOD32 vs.4", Serial_Number = "784R7", Inventory_Number = "57cp", Sealed = true },
            new Computer { Computer_Name = "Dianelys-PC", Operative_System = "Windows XP", Service_Pack = "Service Pck 3", Antivirus = "NOD32 vs.4", Serial_Number = "784R7", Inventory_Number = "57cp", Sealed = true },
            new Computer { Computer_Name = "Dianelys-PC", Operative_System = "Windows XP", Service_Pack = "Service Pck 3", Antivirus = "NOD32 vs.4", Serial_Number = "784R7", Inventory_Number = "57cp", Sealed = true }
        };

        public async Task<IEnumerable<Computer>> GetItemListAsync()
        {
            return await Task.FromResult(items);
        }

        public async Task<Computer> GetItemAsync(string id)
        {
            var result =  items.Where(item => item.Id == id).SingleOrDefault();
            return await Task.FromResult(result);
        }

        public async Task CreateItemAsync(Computer item)
        {
            items.Add(item);
            await Task.CompletedTask;
        }

        public async Task UpdateItemAsync(Computer item)
        {
            var index = items.FindIndex(existingItem => existingItem.Id == item.Id);
            items[index] = item;
            await Task.CompletedTask;
        }

        public async Task DeleteItemAsync(string id)
        {
            var index = items.FindIndex(existingItem => existingItem.Id == id);
            items.RemoveAt(index);
            await Task.CompletedTask;
        }
    }    
}