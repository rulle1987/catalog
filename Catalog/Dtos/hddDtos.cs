using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record HDDDto(
        string Id,          
        string Brand, 
        string Model,
        string Size, 
        int Partitions, 
        string Serial_Number,
        string Origen
    );
    public record CreateHDDDto(         
        [Required] string Brand,
        [Required] string Model,
        [Required] string Size, 
        [Required] int Partitions, 
        [Required] string Serial_Number,
        [Required] string Origen
    );
    public record UpdateHDDDto(         
        [Required] string Brand,
        [Required] string Model,
        [Required] string Size, 
        [Required] int Partitions, 
        [Required] string Serial_Number,
        [Required] string Origen
    );
}