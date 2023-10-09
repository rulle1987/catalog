using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record PrinterDto(
        string Id, 
        string Brand,
        string Model,
        string Serial_Number, 
        string Inventory_Number,        
        string Origen
    );
    public record CreatePrinterDto(        
        [Required] string Brand,
        [Required] string Model,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
    public record UpdatePrinterDto(
        [Required] string Brand,
        [Required] string Model,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
}