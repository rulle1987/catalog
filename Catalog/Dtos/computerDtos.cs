using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record ComputerDto(
        string Id, 
        string Computer_Name, 
        string Operative_System, 
        string Service_Pack, 
        string Antivirus, 
        string Serial_Number, 
        string Inventory_Number, 
        bool Sealed, 
        string Origen
    );
    public record CreateComputerDto(
        [Required] string Computer_Name, 
        [Required] string Operative_System, 
        [Required] string Service_Pack, 
        [Required] string Antivirus, 
        string Serial_Number, 
        string Inventory_Number, 
        bool Sealed, 
        [Required] string Origen
    );
    public record UpdateComputerDto(
        [Required] string Computer_Name, 
        [Required] string Operative_System, 
        [Required] string Service_Pack, 
        [Required] string Antivirus, 
        string Serial_Number, 
        string Inventory_Number, 
        bool Sealed, 
        [Required] string Origen
    );
}