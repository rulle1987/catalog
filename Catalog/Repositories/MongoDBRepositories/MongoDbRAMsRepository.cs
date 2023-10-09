using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog
{
    public class MongoDbRAMsRepository : IRAMsRepository
    {
        private const string databaseName = "catalog";

        private const string collectionName = "rams";

        private readonly IMongoCollection<RAM> collection;

        private readonly FilterDefinitionBuilder<RAM> filterBuilder = Builders<RAM>.Filter;

        public MongoDbRAMsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            collection = database.GetCollection<RAM>(collectionName);
        }
        public async Task CreateItemAsync(RAM item)
        {
            await collection.InsertOneAsync(item);
        }

        public async Task DeleteItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await collection.DeleteOneAsync(filter);
        }

        public async Task<RAM> GetItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            return await collection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<RAM>> GetItemListAsync()
        {
            return await collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateItemAsync(RAM item)
        {
            var filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
            await collection.ReplaceOneAsync(filter, item);
        }
    }
}