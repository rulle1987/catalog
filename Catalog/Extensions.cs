namespace Catalog
{
    public static class Extensions
    {
        public static ComputerDto AsDto(this Computer item)
        {
            return new ComputerDto(
                item.Id, 
                item.Computer_Name, 
                item.Operative_System, 
                item.Service_Pack, 
                item.Antivirus, 
                item.Serial_Number, 
                item.Inventory_Number, 
                item.Sealed, 
                item.Origen
            );
        }
        public static MonitorDto AsDto(this Monitor item)
        {
            return new MonitorDto(
                item.Id,
                item.Brand,
                item.Model,
                item.Serial_Number,
                item.Inventory_Number,
                item.Origen
            );
        }
        public static NetworkDto AsDto(this Network item)
        {
            return new NetworkDto(
                item.Id,
                item.Network_Class,
                item.Dominio,
                item.IPAddress,
                item.Mac,
                item.Mask,
                item.Get_Away,
                item.Prefered_DNS,
                item.Alternative_DNS,
                item.Proxy,
                item.Mail_System,
                item.Mail_User
            );
        }
        public static MotherBoardDto AsDto(this MotherBoard item)
        {
            return new MotherBoardDto(
                item.Id,
                item.Name,
                item.Manufacter,
                item.Product,
                item.Micro,
                item.Origen
            );
        }
        public static RAMDto AsDto(this RAM item)
        {
            return new RAMDto(
                item.Id,
                item.Type,
                item.Size,
                item.Velocity,
                item.Serial_Number,
                item.Origen
            );
        }
        public static KeyboardDto AsDto(this Keyboard item)
        {
            return new KeyboardDto(
                item.Id,
                item.Brand,
                item.Model,
                item.Type,
                item.Serial_Number,
                item.Inventory_Number,
                item.Origen
            );
        }
        public static MouseDto AsDto(this Mouse item)
        {
            return new MouseDto(
                item.Id,
                item.Brand,
                item.Model,
                item.Type,
                item.Serial_Number,
                item.Inventory_Number,
                item.Origen
            );
        }
        public static PrinterDto AsDto(this Printer item)
        {
            return new PrinterDto(
                item.Id,
                item.Brand,
                item.Model,
                item.Serial_Number,
                item.Inventory_Number,
                item.Origen
            );
        }
        public static HDDDto AsDto(this HDD item)
        {
            return new HDDDto(
                item.Id,
                item.Brand,
                item.Model,
                item.Size,
                item.Partitions,
                item.Serial_Number,
                item.Origen
            );
        }
        public static SpeakerDto AsDto(this Speaker item)
        {
            return new SpeakerDto(
                item.Id,
                item.Brand,
                item.Model,
                item.Serial_Number,
                item.Inventory_Number,
                item.Origen
            );
        }
        public static TowerDto AsDto(this Tower item)
        {
            return new TowerDto(
                item.Id,
                item.Brand,
                item.Serial_Number,
                item.Origen
            );
        }
        public static UPSDto AsDto(this UPS item)
        {
            return new UPSDto(
                item.Id,
                item.Brand,
                item.Serial_Number,
                item.Inventory_Number,                
                item.Origen
            );            
        }
        public static PruebaDto AsDto(this Prueba item)
        {
            return new PruebaDto(
                item.Id,
                item.Computer,
                item.Items
            );            
        }
        public static FileDto AsDto(this File item)
        {
            return new FileDto(
                item.Id,
                item.Created,
                item.Area,
                item.Manager_Area,
                item.Manager_Computer,
                item.Computer,
                item.MotherBoard,
                item.Monitor,
                item.Keyboard,
                item.Mouse,
                item.Network,
                item.hddItemsId,
                item.ramItemsId,
                item.Printer,
                item.Speaker,
                item.Tower,
                item.UPS
            );
        }
    }
}