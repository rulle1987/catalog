using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog
{
    public class MongoDbFilesRepository : IFilesRepository
    {
        private const string databaseName = "catalog";

        private const string collectionName = "files";

        private readonly IMongoCollection<File> collection;

        private readonly FilterDefinitionBuilder<File> filterBuilder = Builders<File>.Filter;

        public MongoDbFilesRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            collection = database.GetCollection<File>(collectionName);
        }
        public async Task CreateItemAsync(File item)
        {
            await collection.InsertOneAsync(item);
        }

        public async Task DeleteItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await collection.DeleteOneAsync(filter);
        }

        public async Task<File> GetItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            return await collection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<File>> GetItemListAsync()
        {
            return await collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateItemAsync(File item)
        {
            var filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
            await collection.ReplaceOneAsync(filter, item);
        }
    }
}