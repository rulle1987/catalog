using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog
{
    public record Computer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Computer_Name { get; set; }
        public string Operative_System { get; set; }
        public string Service_Pack { get; set; }
        public string Antivirus { get; set; }
        public string Serial_Number { get; set; }
        public string Inventory_Number { get; set; }
        public bool Sealed { get; set; }
        public string Origen { get; set; }
    }
}