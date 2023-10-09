using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog
{
    public record HDD
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }        
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Size { get; set; }
        public int Partitions { get; set; }
        public string Serial_Number { get; set; }
        public string Origen { get; set; }
    }
}