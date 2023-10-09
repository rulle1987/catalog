using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog
{
    public class MongoDbMotherBoardsRepository : IMotherBoardsRepository
    {
        private const string databaseName = "catalog";

        private const string collectionName = "motherBoards";

        private readonly IMongoCollection<MotherBoard> collection;

        private readonly FilterDefinitionBuilder<MotherBoard> filterBuilder = Builders<MotherBoard>.Filter;

        public MongoDbMotherBoardsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            collection = database.GetCollection<MotherBoard>(collectionName);
        }
        public async Task CreateItemAsync(MotherBoard item)
        {
            await collection.InsertOneAsync(item);
        }

        public async Task DeleteItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            await collection.DeleteOneAsync(filter);
        }

        public async Task<MotherBoard> GetItemAsync(string id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            return await collection.Find(filter).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MotherBoard>> GetItemListAsync()
        {
            return await collection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task UpdateItemAsync(MotherBoard item)
        {
            var filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
            await collection.ReplaceOneAsync(filter, item);
        }
    }
}