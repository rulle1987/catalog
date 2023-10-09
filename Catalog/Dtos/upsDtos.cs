using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record UPSDto(
        string Id, 
        string Brand,
        string Serial_Number, 
        string Inventory_Number,        
        string Origen
    );
    public record CreateUPSDto(        
        [Required] string Brand,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
    public record UpdateUPSDto(
        [Required] string Brand,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
}