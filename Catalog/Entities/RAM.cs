using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog
{
    public record RAM
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Type { get; set; }
        public string Size { get; set; }
        public string Velocity { get; set; }
        public string Serial_Number { get; set; }
        public string Origen { get; set; }
    }
}