using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog
{
    public class MongoDbPrintersRepository : IPrintersRepository
    {
        private const string databaseName = "catalog";

        private const string collectionName = "printers";

        private readonly IMongoCollection<Printer> collection;

        private readonly FilterDefinitionBuilder<Printer> filterBuilder = Builders<Printer>.Filter;

        public MongoDbPrintersRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            collection = database.GetCollection<Printer>(collectionName);
        }
        public async Task CreateItemAsync(Printer item)
        {
            await collection.InsertOneAsync(item);
        }

        public async Task DeleteItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await collection.DeleteOneAsync(filter);
        }

        public async Task<Printer> GetItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            return await collection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Printer>> GetItemListAsync()
        {
            return await collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateItemAsync(Printer item)
        {
            var filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
            await collection.ReplaceOneAsync(filter, item);
        }
    }
}