using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record TowerDto(
        string Id, 
        string Brand,
        string Serial_Number,
        string Origen
    );
    public record CreateTowerDto(        
        [Required] string Brand,
        [Required] string Serial_Number,
        [Required] string Origen
    );
    public record UpdateTowerDto(
        [Required] string Brand,
        [Required] string Serial_Number,
        [Required] string Origen
    );
}