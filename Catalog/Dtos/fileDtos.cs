using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Catalog
{       
    public record FileDto(
        string Id, 
        DateTimeOffset Created, 
        string Area, 
        string Manager_Area, 
        string Manager_Computer, 
        Computer Computer, 
        MotherBoard MotherBoard, 
        Monitor Monitor, 
        Keyboard Keyboard,
        Mouse Mouse,
        Network Network,
        List<string> hddItemsId,
        List<string> ramItemsId,
        Printer Printer,
        Speaker Speaker,
        Tower Tower,
        UPS UPS
    );
    public record CreateFileDto(
        [Required] string Area, 
        [Required] string Manager_Area, 
        [Required] string Manager_Computer, 
        [Required] Computer Computer, 
        [Required] MotherBoard MotherBoard, 
        [Required] Monitor Monitor, 
        [Required] Keyboard Keyboard,
        [Required] Mouse Mouse,
        [Required] Network Network,
        List<string> hddItemsId,
        List<string> ramItemsId,
        Printer Printer,
        Speaker Speaker,
        Tower Tower,
        UPS UPS        
    );
    public record UpdateFileDto(
        [Required] DateTimeOffset Created,
        [Required] string Area, 
        [Required] string Manager_Area, 
        [Required] string Manager_Computer, 
        [Required] Computer Computer, 
        [Required] MotherBoard MotherBoard, 
        [Required] Monitor Monitor, 
        [Required] Keyboard Keyboard,
        [Required] Mouse Mouse,
        [Required] Network Network,
        List<string> hddItemsId,
        List<string> ramItemsId,
        Printer Printer,
        Speaker Speaker,
        Tower Tower,
        UPS UPS
    );
}