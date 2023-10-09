using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record SpeakerDto(
        string Id, 
        string Brand,
        string Model,
        string Serial_Number, 
        string Inventory_Number,        
        string Origen
    );
    public record CreateSpeakerDto(        
        [Required] string Brand,
        [Required] string Model,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
    public record UpdateSpeakerDto(
        [Required] string Brand,
        [Required] string Model,
        [Required] string Serial_Number,
        string Inventory_Number,        
        [Required] string Origen
    );
}