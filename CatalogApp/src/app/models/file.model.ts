import { ComputerData } from "./computer.model";
import { KeyboardData } from "./keyboard.model";
import { MonitorData } from "./monitor.model";
import { MotherBoardData } from "./motherboard.model";
import { MouseData } from "./mouse.model";
import { NetworkData } from "./network.model";
import { PrinterData } from "./printer.model";
import { SpeakerData } from "./speaker.model";
import { TowerData } from "./tower.model";
import { UpsData } from "./ups.model";
 
export interface FileData { 
    id: string;     
    area:string;
    manager_Area:string;
    manager_Computer:string;
    computer:ComputerData;
    motherBoard:MotherBoardData;
    monitor:MonitorData;
    keyboard:KeyboardData;
    mouse:MouseData;
    network:NetworkData;
    ups?:UpsData;
    printer?:PrinterData;
    speaker?:SpeakerData;
    tower?:TowerData;
}