using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog
{
    public class MongoDbUPSRepository : IUPSRepository
    {
        private const string databaseName = "catalog";

        private const string collectionName = "ups";

        private readonly IMongoCollection<UPS> collection;

        private readonly FilterDefinitionBuilder<UPS> filterBuilder = Builders<UPS>.Filter;

        public MongoDbUPSRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            collection = database.GetCollection<UPS>(collectionName);
        }
        public async Task CreateItemAsync(UPS item)
        {
            await collection.InsertOneAsync(item);
        }

        public async Task DeleteItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await collection.DeleteOneAsync(filter);
        }

        public async Task<UPS> GetItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            return await collection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<UPS>> GetItemListAsync()
        {
            return await collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateItemAsync(UPS item)
        {
            var filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
            await collection.ReplaceOneAsync(filter, item);
        }
    }
}