using System;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{
    public record NetworkDto(
        string Id, 
        string Network_Class, 
        string Dominio, 
        string IPAddress, 
        string Mac, 
        string Mask, 
        string Get_Away, 
        string Prefered_DNS, 
        string Alternative_DNS,
        string Proxy,
        string Mail_System,
        string Mail_User
    );
    public record CreateNetworkDto(
        [Required] string Network_Class, 
        string Dominio, 
        [Required] string IPAddress, 
        [Required] string Mac, 
        [Required] string Mask, 
        [Required] string Get_Away, 
        [Required] string Prefered_DNS, 
        [Required] string Alternative_DNS,
        [Required] string Proxy,
        [Required] string Mail_System,
        string Mail_User
    );
    public record UpdateNetworkDto(
        [Required] string Network_Class, 
        string Dominio, 
        [Required] string IPAddress, 
        [Required] string Mac, 
        [Required] string Mask, 
        [Required] string Get_Away, 
        [Required] string Prefered_DNS, 
        [Required] string Alternative_DNS,
        [Required] string Proxy,
        [Required] string Mail_System,
        string Mail_User
    );
}