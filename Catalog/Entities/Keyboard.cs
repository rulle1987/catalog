using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog
{
    public record Keyboard
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; init; }
        public string Model { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Serial_Number { get; set; }
        public string Inventory_Number { get; set; }
        public string Origen { get; set; }
    }
}