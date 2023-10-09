using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record MouseDto(
        string Id, 
        string Brand,
        string Model,
        string Type,
        string Serial_Number, 
        string Inventory_Number,        
        string Origen
    );
    public record CreateMouseDto(        
        [Required] string Brand,
        [Required] string Model,
        [Required] string Type,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
    public record UpdateMouseDto(
        [Required] string Brand,
        [Required] string Model,
        [Required] string Type,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
}