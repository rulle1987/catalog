using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record MotherBoardDto(
        string Id, 
        string Name, 
        string Manufacter, 
        string Product, 
        string Micro,
        string Origen
    );
    public record CreateMotherBoardDto(        
        [Required] string Name, 
        [Required] string Manufacter, 
        [Required] string Product, 
        [Required] string Micro,
        [Required] string Origen
    );
    public record UpdateMotherBoardDto(
        [Required] string Name, 
        [Required] string Manufacter, 
        [Required] string Product, 
        [Required] string Micro,
        [Required] string Origen
    );
}