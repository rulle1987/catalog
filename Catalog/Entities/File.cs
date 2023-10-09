using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Catalog
{
    public record File
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTimeOffset Created { get; set; }
        public string Area { get; set; }
        public string Manager_Area { get; set; }   
        public string Manager_Computer { get; set; }
        public Computer Computer { get; set; }
        public MotherBoard MotherBoard { get; set; }
        public Monitor Monitor { get; set; }
        public Keyboard Keyboard { get; set; }
        public Mouse Mouse { get; set; }
        public Network Network { get; set; }
        public List<string> hddItemsId { get; set; } = null!;
        public List<string> ramItemsId { get; set; } = null!;        
        public Printer Printer { get; set; }
        public Speaker Speaker { get; set; }
        public Tower Tower { get; set; }
        public UPS UPS { get; set; }
    }
}