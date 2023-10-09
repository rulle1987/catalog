using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record RAMDto(
        string Id, 
        string Type, 
        string Size, 
        string Velocity,
        string Serial_Number,
        string Origen
    );
    public record CreateRAMDto(
        [Required] string Type, 
        [Required] string Size, 
        [Required] string Velocity,
        [Required] string Serial_Number,
        [Required] string Origen
    );
    public record UpdateRAMDto(
        [Required] string Type, 
        [Required] string Size, 
        [Required] string Velocity,
        [Required] string Serial_Number,
        [Required] string Origen
    );
}