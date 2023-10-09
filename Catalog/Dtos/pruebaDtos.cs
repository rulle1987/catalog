using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record PruebaDto(
        string Id, 
        Computer Computer,
        List<string> Items
    );
    public record CreatePruebaDto
    {        
        public Computer Computer { get; set; }
        
        public List<string> Items { get; set; }
    }
    public record UpdatePruebaDto(
        Computer Computer,
        List<string> Items
    );
}