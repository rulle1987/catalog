using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Catalog
{
    public record Network
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Network_Class { get; set; }
        public string Dominio { get; set; }
        public string IPAddress { get; set; }
        public string Mac { get; set; }
        public string Mask { get; set; }
        public string Get_Away { get; set; }
        public string Prefered_DNS { get; set; }
        public string Alternative_DNS { get; set; }
        public string Proxy { get; set; }
        public string Mail_System { get; set; }
        public string Mail_User { get; set; }
    }
}