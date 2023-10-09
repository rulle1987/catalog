import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api.service';

import { FileData } from 'src/app/models/file.model';
import { ComputerData } from 'src/app/models/computer.model';
import { MotherBoardData } from 'src/app/models/motherboard.model';
import { KeyboardData } from 'src/app/models/keyboard.model';
import { MouseData } from 'src/app/models/mouse.model';
import { MonitorData } from 'src/app/models/monitor.model';
import { NetworkData } from 'src/app/models/network.model';
import { UpsData } from 'src/app/models/ups.model';
import { PrinterData } from 'src/app/models/printer.model';
import { SpeakerData } from 'src/app/models/speaker.model';
import { TowerData } from 'src/app/models/tower.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  // Variables
  
  result:any;  

  itemList:any = []; 
  
  // Llenar listas al empezar
  computerlist:ComputerData[] = [];
  motherBoardList:MotherBoardData[] = [];
  monitorList:MonitorData[] = [];
  keyboardList:KeyboardData[] = [];
  mouseList:MouseData[] = [];
  networkList:NetworkData[] = [];
  upsList:UpsData[] = [];
  printerList:PrinterData[] = [];
  speakerList:SpeakerData[] = [];
  towerList:TowerData[] = [];
  hddList:any = [];
  ramList:any = [];

  // Buscar ids de los objetos seleccionados
  computerId:string = "";
  motherBoardId:string = "";
  monitorId:string = "";
  keyboardId:string = "";
  mouseId:string = "";
  networkId:string = "";
  upsId:string = "";
  printerId:string = "";
  speakerId:string = "";
  towerId:string = "";
    
  recivedArea:string = "";
  recivedManagerArea:string = "";
  recivedManagerComputer:string = "";

  areasList: any = ['Agro-Meteorología', 'Pronóstico', 'Dirección', 'Economía'];
  
  showAdd!: boolean;
  showEdit: boolean = false;   
  ModalTitle: string = "";
  editData:any; 
  
  constructor(private service: ApiService) { 
   }

  ngOnInit(): void {   
    this.loadList(); 
    this.loadAllList();
  }

  formValue = new FormGroup({    
    area:new FormControl('', Validators.required),
    manager_Area:new FormControl('', Validators.required),
    manager_Computer:new FormControl('', Validators.required),
    computer:new FormControl(null, Validators.required),
    motherBoard:new FormControl(null, Validators.required),    
    keyboard:new FormControl(null, Validators.required),
    mouse:new FormControl(null, Validators.required),
    monitor:new FormControl(null, Validators.required),    
    network:new FormControl(null, Validators.required),
    ups:new FormControl(null),
    printer:new FormControl(null),
    speaker:new FormControl(null),
    tower:new FormControl(null)
  });

  loadAllList() {
    this.service.getComputersList().subscribe(res =>{
      this.computerlist = res;      
    });
    this.service.getMotherboardList().subscribe(res =>{
      this.motherBoardList = res;
    });
    this.service.getKeyboardsList().subscribe(res =>{
      this.keyboardList = res;
    });
    this.service.getMousesList().subscribe(res =>{
      this.mouseList = res;
    });
    this.service.getMonitorsList().subscribe(res =>{
      this.monitorList = res;
    });
    this.service.getUpsList().subscribe(res =>{
      this.upsList = res;
    });
    this.service.getNetworkList().subscribe(res =>{
      this.networkList = res;
    });
    this.service.getHDDList().subscribe(res =>{
      this.hddList = res;
    });
    this.service.getRAMsList().subscribe(res =>{
      this.ramList = res;
    });    
    this.service.getPrintersList().subscribe(res =>{
      this.printerList = res;
    });
    this.service.getSpeakersList().subscribe(res =>{
      this.speakerList = res;
    });
    this.service.getTowersList().subscribe(res =>{
      this.towerList = res;
    });
  }  

  loadList() {
    this.service.getFilesList().subscribe(res =>{
      this.itemList = res;
    });
  }

  clickAddItem() {
    this.formValue.reset();
    this.ModalTitle = "Confeccionar Expediente";
    this.showAdd = true;
  }

  addItem() {
    if(this.formValue.valid) {

      let computerItem: ComputerData = {} as ComputerData;
      let motherBoardItem: MotherBoardData = {} as MotherBoardData;
      let monitorItem: MonitorData = {} as MonitorData;
      let keyboardItem: KeyboardData = {} as KeyboardData;
      let mouseItem: MouseData = {} as MouseData;
      let networkItem: NetworkData = {} as NetworkData;
      let upsItem: UpsData = {} as UpsData;
      let printerItem: PrinterData = {} as PrinterData;
      let speakerItem: SpeakerData = {} as SpeakerData;
      let towerItem: TowerData = {} as TowerData;

      for (let index = 0; index < this.computerlist.length; index++) {
        this.computerId = this.formValue.get('computer')?.value;
        if (this.computerId == this.computerlist[index].id) {
          computerItem = {
            id: this.computerlist[index].id,
            computer_Name: this.computerlist[index].computer_Name,
            operative_System: this.computerlist[index].operative_System,
            service_Pack: this.computerlist[index].service_Pack,
            antivirus: this.computerlist[index].antivirus,
            serial_Number: this.computerlist[index].serial_Number,
            inventory_Number: this.computerlist[index].inventory_Number,
            sealed: this.computerlist[index].sealed,
            origen: this.computerlist[index].origen
          }          
        }
      } // Fin del for para buscar computadoras

      for (let index = 0; index < this.motherBoardList.length; index++) {
        this.motherBoardId = this.formValue.get('motherBoard')?.value;
        if (this.motherBoardId == this.motherBoardList[index].id) {
          motherBoardItem = {
            id: this.motherBoardList[index].id,
            name: this.motherBoardList[index].name,
            manufacter: this.motherBoardList[index].manufacter,
            product: this.motherBoardList[index].product,
            micro: this.motherBoardList[index].micro,
            origen: this.motherBoardList[index].origen
          }          
        }
      } // Fin del for para buscar motherBoard

      for (let index = 0; index < this.monitorList.length; index++) {
        this.monitorId = this.formValue.get('monitor')?.value;
        if (this.monitorId == this.monitorList[index].id) {
          monitorItem = {
            id: this.monitorList[index].id,
            brand: this.monitorList[index].brand,
            model: this.monitorList[index].model,
            serial_Number: this.monitorList[index].serial_Number,
            inventory_Number: this.monitorList[index].inventory_Number,
            origen: this.monitorList[index].origen
          }          
        }
      } // Fin del for para buscar monitor

      for (let index = 0; index < this.keyboardList.length; index++) {
        this.keyboardId = this.formValue.get('keyboard')?.value;
        if (this.keyboardId == this.keyboardList[index].id) {
          keyboardItem = {
            id: this.keyboardList[index].id,
            brand: this.keyboardList[index].brand,
            model: this.keyboardList[index].model,
            type: this.keyboardList[index].type,
            serial_Number: this.keyboardList[index].serial_Number,
            inventory_Number: this.keyboardList[index].inventory_Number,
            origen: this.keyboardList[index].origen
          }          
        }
      } // Fin del for para buscar keyboard

      for (let index = 0; index < this.mouseList.length; index++) {
        this.mouseId = this.formValue.get('mouse')?.value;
        if (this.mouseId == this.mouseList[index].id) {
          mouseItem = {
            id: this.mouseList[index].id,
            brand: this.mouseList[index].brand,
            model: this.mouseList[index].model,
            type: this.mouseList[index].type,
            serial_Number: this.mouseList[index].serial_Number,
            inventory_Number: this.mouseList[index].inventory_Number,
            origen: this.mouseList[index].origen
          }          
        }
      } // Fin del for para buscar mouse

      for (let index = 0; index < this.networkList.length; index++) {
        this.networkId = this.formValue.get('network')?.value;
        if (this.networkId == this.networkList[index].id) {
          networkItem = {
            id: this.networkList[index].id,
            network_Class: this.networkList[index].network_Class,
            dominio: this.networkList[index].dominio,
            ipAddress: this.networkList[index].ipAddress,
            mac: this.networkList[index].mac,
            mask: this.networkList[index].mask,
            get_Away: this.networkList[index].get_Away,
            prefered_DNS: this.networkList[index].prefered_DNS,
            alternative_DNS: this.networkList[index].alternative_DNS,
            proxy: this.networkList[index].proxy,
            mail_System: this.networkList[index].mail_System,
            mail_User: this.networkList[index].mail_User
          }          
        }
      } // Fin del for para buscar datos de red

      // Comprobar si se seleccionó una Ups

      if(this.formValue.get("ups")?.value != null) {
        for (let index = 0; index < this.upsList.length; index++) {
          this.upsId = this.formValue.get('ups')?.value;
          if (this.upsId == this.upsList[index].id) {
            upsItem = {
              id: this.upsList[index].id,
              brand: this.upsList[index].brand,
              serial_Number: this.upsList[index].serial_Number,
              inventory_Number: this.upsList[index].inventory_Number,
              origen: this.upsList[index].origen
            }          
          }
        } // Fin del for para buscar ups
      }
      
      if(this.formValue.get("printer")?.value != null) {
        for (let index = 0; index < this.printerList.length; index++) {
          this.printerId = this.formValue.get('printer')?.value;
          if (this.printerId == this.printerList[index].id) {
            printerItem = {
              id: this.printerList[index].id,
              model: this.printerList[index].model,
              brand: this.printerList[index].brand,
              serial_Number: this.printerList[index].serial_Number,
              inventory_Number: this.printerList[index].inventory_Number,
              origen: this.printerList[index].origen
            }          
          }
        } // Fin del for para buscar printer
      }

      if(this.formValue.get("speaker")?.value != null) {
        for (let index = 0; index < this.speakerList.length; index++) {
          this.speakerId = this.formValue.get('speaker')?.value;
          if (this.speakerId == this.speakerList[index].id) {
            speakerItem = {
              id: this.speakerList[index].id,
              model: this.speakerList[index].model,
              brand: this.speakerList[index].brand,
              serial_Number: this.speakerList[index].serial_Number,
              inventory_Number: this.speakerList[index].inventory_Number,
              origen: this.speakerList[index].origen
            }          
          }
        } // Fin del for para buscar speaker
      }

      if(this.formValue.get("tower")?.value != null) {
        for (let index = 0; index < this.towerList.length; index++) {
          this.towerId = this.formValue.get('tower')?.value;
          if (this.towerId == this.towerList[index].id) {
            towerItem = {
              id: this.towerList[index].id,
              brand: this.towerList[index].brand,
              serial_Number: this.towerList[index].serial_Number,
              origen: this.towerList[index].origen
            }          
          }
        } // Fin del for para buscar tower
      }


      // Llenar el objeto File a guardar

      const item:FileData = {
        id: "",
        area: this.formValue.get('area')?.value,
        manager_Area: this.formValue.get('manager_Area')?.value,
        manager_Computer: this.formValue.get('manager_Computer')?.value,
        computer: {
        id: computerItem.id,
        computer_Name: computerItem.computer_Name,
        operative_System: computerItem.operative_System,
        service_Pack: computerItem.service_Pack,
        antivirus: computerItem.antivirus,
        serial_Number: computerItem.serial_Number,
        inventory_Number: computerItem.inventory_Number,
        origen: computerItem.origen,
        sealed: computerItem.sealed
        },
        motherBoard: {
        id: motherBoardItem.id,
        name: motherBoardItem.name,
        manufacter: motherBoardItem.manufacter,
        product: motherBoardItem.product,
        micro: motherBoardItem.micro,
        origen: motherBoardItem.origen
        },
        monitor: {
        id: monitorItem.id,
        brand: monitorItem.brand,
        model: monitorItem.model,
        serial_Number: monitorItem.serial_Number,
        inventory_Number: monitorItem.inventory_Number,
        origen: monitorItem.origen
        },
        keyboard: {
        id: keyboardItem.id,
        brand: keyboardItem.brand,
        model: keyboardItem.model,
        type: keyboardItem.type,
        serial_Number: keyboardItem.serial_Number,
        inventory_Number: keyboardItem.inventory_Number,
        origen: keyboardItem.origen
        },
        mouse: {
        id: mouseItem.id,
        brand: mouseItem.brand,
        model: mouseItem.model,
        type: mouseItem.type,
        serial_Number: mouseItem.serial_Number,
        inventory_Number: mouseItem.inventory_Number,
        origen: mouseItem.origen
        },
        network: {
        id: networkItem.id,
        network_Class: networkItem.network_Class,
        dominio: networkItem.dominio,
        ipAddress: networkItem.ipAddress,
        mac: networkItem.mac,
        mask: networkItem.mask,
        get_Away: networkItem.get_Away,
        prefered_DNS: networkItem.prefered_DNS,
        alternative_DNS: networkItem.alternative_DNS,
        proxy: networkItem.proxy,
        mail_System: networkItem.mail_System,
        mail_User: networkItem.mail_User
        },
        ups: {
          id: upsItem.id,
          brand: upsItem.brand,          
          serial_Number: upsItem.serial_Number,
          inventory_Number: upsItem.inventory_Number,
          origen: upsItem.origen
        },
        printer: {
          id: printerItem.id,
          brand: printerItem.brand,
          model: printerItem.model,
          serial_Number: printerItem.serial_Number,
          inventory_Number: printerItem.inventory_Number,
          origen: printerItem.origen
        },
        speaker: {
          id: speakerItem.id,
          brand: speakerItem.brand,
          model: speakerItem.brand,
          serial_Number: speakerItem.serial_Number,
          inventory_Number: speakerItem.inventory_Number,
          origen: speakerItem.origen
        },
        tower: {
          id: towerItem.id,
          brand: towerItem.brand,
          serial_Number: towerItem.serial_Number,
          origen: towerItem.origen
        }
      }

      // Guardar el objeto File en la base de datos a traves de la llamada del serivio api

      this.service.addFile(item).subscribe(res => {
        console.log("Guardado", item);
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();      
        this.loadList();

      });



    } // Fin de comprobar si el form es valido
  } // Fin del metodo

  // Editar
  editItem(id:any) {

    this.ModalTitle = "Editar Expediente";
    this.showAdd = false;
    this.showEdit = true;  

    this.service.getFileById(id).subscribe(res => {
      this.editData = res;      
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),
          area:new FormControl(this.editData.area, { validators: [Validators.required ], updateOn: 'blur' }),
          manager_Area:new FormControl(this.editData.manager_Area, { validators: [Validators.required ], updateOn: 'blur' }),
          manager_Computer:new FormControl(this.editData.manager_Computer, { validators: [Validators.required ], updateOn: 'blur' }),
          computer:new FormControl(null, { validators: [Validators.required ], updateOn: 'blur' }),
          motherBoard:new FormControl(null, Validators.required),    
          keyboard:new FormControl(null, Validators.required),
          mouse:new FormControl(null, Validators.required),
          monitor:new FormControl(null, Validators.required),    
          network:new FormControl(null, Validators.required),
          ups:new FormControl(null),
          printer:new FormControl(null),
          speaker:new FormControl(null),
          tower:new FormControl(null)

        })        
      }
      this.formValue.updateValueAndValidity();
    });
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      let computerItem: ComputerData = {} as ComputerData;
      let motherBoardItem: MotherBoardData = {} as MotherBoardData;
      let monitorItem: MonitorData = {} as MonitorData;
      let keyboardItem: KeyboardData = {} as KeyboardData;
      let mouseItem: MouseData = {} as MouseData;
      let networkItem: NetworkData = {} as NetworkData;
      let upsItem: UpsData = {} as UpsData;
      let printerItem: PrinterData = {} as PrinterData;
      let speakerItem: SpeakerData = {} as SpeakerData;
      let towerItem: TowerData = {} as TowerData;

      for (let index = 0; index < this.computerlist.length; index++) {
        this.computerId = this.formValue.get('computer')?.value;
        if (this.computerId == this.computerlist[index].id) {
          computerItem = {
            id: this.computerlist[index].id,
            computer_Name: this.computerlist[index].computer_Name,
            operative_System: this.computerlist[index].operative_System,
            service_Pack: this.computerlist[index].service_Pack,
            antivirus: this.computerlist[index].antivirus,
            serial_Number: this.computerlist[index].serial_Number,
            inventory_Number: this.computerlist[index].inventory_Number,
            sealed: this.computerlist[index].sealed,
            origen: this.computerlist[index].origen
          }          
        }
      } // Fin del for para buscar computadoras

      for (let index = 0; index < this.motherBoardList.length; index++) {
        this.motherBoardId = this.formValue.get('motherBoard')?.value;
        if (this.motherBoardId == this.motherBoardList[index].id) {
          motherBoardItem = {
            id: this.motherBoardList[index].id,
            name: this.motherBoardList[index].name,
            manufacter: this.motherBoardList[index].manufacter,
            product: this.motherBoardList[index].product,
            micro: this.motherBoardList[index].micro,
            origen: this.motherBoardList[index].origen
          }          
        }
      } // Fin del for para buscar motherBoard

      for (let index = 0; index < this.monitorList.length; index++) {
        this.monitorId = this.formValue.get('monitor')?.value;
        if (this.monitorId == this.monitorList[index].id) {
          monitorItem = {
            id: this.monitorList[index].id,
            brand: this.monitorList[index].brand,
            model: this.monitorList[index].model,
            serial_Number: this.monitorList[index].serial_Number,
            inventory_Number: this.monitorList[index].inventory_Number,
            origen: this.monitorList[index].origen
          }          
        }
      } // Fin del for para buscar monitor

      for (let index = 0; index < this.keyboardList.length; index++) {
        this.keyboardId = this.formValue.get('keyboard')?.value;
        if (this.keyboardId == this.keyboardList[index].id) {
          keyboardItem = {
            id: this.keyboardList[index].id,
            brand: this.keyboardList[index].brand,
            model: this.keyboardList[index].model,
            type: this.keyboardList[index].type,
            serial_Number: this.keyboardList[index].serial_Number,
            inventory_Number: this.keyboardList[index].inventory_Number,
            origen: this.keyboardList[index].origen
          }          
        }
      } // Fin del for para buscar keyboard

      for (let index = 0; index < this.mouseList.length; index++) {
        this.mouseId = this.formValue.get('mouse')?.value;
        if (this.mouseId == this.mouseList[index].id) {
          mouseItem = {
            id: this.mouseList[index].id,
            brand: this.mouseList[index].brand,
            model: this.mouseList[index].model,
            type: this.mouseList[index].type,
            serial_Number: this.mouseList[index].serial_Number,
            inventory_Number: this.mouseList[index].inventory_Number,
            origen: this.mouseList[index].origen
          }          
        }
      } // Fin del for para buscar mouse

      for (let index = 0; index < this.networkList.length; index++) {
        this.networkId = this.formValue.get('network')?.value;
        if (this.networkId == this.networkList[index].id) {
          networkItem = {
            id: this.networkList[index].id,
            network_Class: this.networkList[index].network_Class,
            dominio: this.networkList[index].dominio,
            ipAddress: this.networkList[index].ipAddress,
            mac: this.networkList[index].mac,
            mask: this.networkList[index].mask,
            get_Away: this.networkList[index].get_Away,
            prefered_DNS: this.networkList[index].prefered_DNS,
            alternative_DNS: this.networkList[index].alternative_DNS,
            proxy: this.networkList[index].proxy,
            mail_System: this.networkList[index].mail_System,
            mail_User: this.networkList[index].mail_User
          }          
        }
      } // Fin del for para buscar datos de red

      // Comprobar si se seleccionó una Ups

      if(this.formValue.get("ups")?.value != null) {
        for (let index = 0; index < this.upsList.length; index++) {
          this.upsId = this.formValue.get('ups')?.value;
          if (this.upsId == this.upsList[index].id) {
            upsItem = {
              id: this.upsList[index].id,
              brand: this.upsList[index].brand,
              serial_Number: this.upsList[index].serial_Number,
              inventory_Number: this.upsList[index].inventory_Number,
              origen: this.upsList[index].origen
            }          
          }
        } // Fin del for para buscar ups
      }
      
      if(this.formValue.get("printer")?.value != null) {
        for (let index = 0; index < this.printerList.length; index++) {
          this.printerId = this.formValue.get('printer')?.value;
          if (this.printerId == this.printerList[index].id) {
            printerItem = {
              id: this.printerList[index].id,
              model: this.printerList[index].model,
              brand: this.printerList[index].brand,
              serial_Number: this.printerList[index].serial_Number,
              inventory_Number: this.printerList[index].inventory_Number,
              origen: this.printerList[index].origen
            }          
          }
        } // Fin del for para buscar printer
      }

      if(this.formValue.get("speaker")?.value != null) {
        for (let index = 0; index < this.speakerList.length; index++) {
          this.speakerId = this.formValue.get('speaker')?.value;
          if (this.speakerId == this.speakerList[index].id) {
            speakerItem = {
              id: this.speakerList[index].id,
              model: this.speakerList[index].model,
              brand: this.speakerList[index].brand,
              serial_Number: this.speakerList[index].serial_Number,
              inventory_Number: this.speakerList[index].inventory_Number,
              origen: this.speakerList[index].origen
            }          
          }
        } // Fin del for para buscar speaker
      }

      if(this.formValue.get("tower")?.value != null) {
        for (let index = 0; index < this.towerList.length; index++) {
          this.towerId = this.formValue.get('tower')?.value;
          if (this.towerId == this.towerList[index].id) {
            towerItem = {
              id: this.towerList[index].id,
              brand: this.towerList[index].brand,
              serial_Number: this.towerList[index].serial_Number,
              origen: this.towerList[index].origen
            }          
          }
        } // Fin del for para buscar tower
      }


      // Llenar el objeto File a guardar

      const item:FileData = {
        id: this.formValue.value.id,
        area: this.formValue.get('area')?.value,
        manager_Area: this.formValue.get('manager_Area')?.value,
        manager_Computer: this.formValue.get('manager_Computer')?.value,
        computer: {
        id: computerItem.id,
        computer_Name: computerItem.computer_Name,
        operative_System: computerItem.operative_System,
        service_Pack: computerItem.service_Pack,
        antivirus: computerItem.antivirus,
        serial_Number: computerItem.serial_Number,
        inventory_Number: computerItem.inventory_Number,
        origen: computerItem.origen,
        sealed: computerItem.sealed
        },
        motherBoard: {
        id: motherBoardItem.id,
        name: motherBoardItem.name,
        manufacter: motherBoardItem.manufacter,
        product: motherBoardItem.product,
        micro: motherBoardItem.micro,
        origen: motherBoardItem.origen
        },
        monitor: {
        id: monitorItem.id,
        brand: monitorItem.brand,
        model: monitorItem.model,
        serial_Number: monitorItem.serial_Number,
        inventory_Number: monitorItem.inventory_Number,
        origen: monitorItem.origen
        },
        keyboard: {
        id: keyboardItem.id,
        brand: keyboardItem.brand,
        model: keyboardItem.model,
        type: keyboardItem.type,
        serial_Number: keyboardItem.serial_Number,
        inventory_Number: keyboardItem.inventory_Number,
        origen: keyboardItem.origen
        },
        mouse: {
        id: mouseItem.id,
        brand: mouseItem.brand,
        model: mouseItem.model,
        type: mouseItem.type,
        serial_Number: mouseItem.serial_Number,
        inventory_Number: mouseItem.inventory_Number,
        origen: mouseItem.origen
        },
        network: {
        id: networkItem.id,
        network_Class: networkItem.network_Class,
        dominio: networkItem.dominio,
        ipAddress: networkItem.ipAddress,
        mac: networkItem.mac,
        mask: networkItem.mask,
        get_Away: networkItem.get_Away,
        prefered_DNS: networkItem.prefered_DNS,
        alternative_DNS: networkItem.alternative_DNS,
        proxy: networkItem.proxy,
        mail_System: networkItem.mail_System,
        mail_User: networkItem.mail_User
        },
        ups: {
          id: upsItem.id,
          brand: upsItem.brand,          
          serial_Number: upsItem.serial_Number,
          inventory_Number: upsItem.inventory_Number,
          origen: upsItem.origen
        },
        printer: {
          id: printerItem.id,
          brand: printerItem.brand,
          model: printerItem.model,
          serial_Number: printerItem.serial_Number,
          inventory_Number: printerItem.inventory_Number,
          origen: printerItem.origen
        },
        speaker: {
          id: speakerItem.id,
          brand: speakerItem.brand,
          model: speakerItem.brand,
          serial_Number: speakerItem.serial_Number,
          inventory_Number: speakerItem.inventory_Number,
          origen: speakerItem.origen
        },
        tower: {
          id: towerItem.id,
          brand: towerItem.brand,
          serial_Number: towerItem.serial_Number,
          origen: towerItem.origen
        }
      }

      this.service.updateFile(item, item.id).subscribe(res => {        
        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();
  
      });
    }
  }

  // Eliminar
  deleteItem(data: any) {
    this.service.deleteFile(data.id).subscribe(res => {      
      this.loadList();
    })
  }
  
  get area() {
    return this.formValue.get('area');
  }
  get manager_Area() {
    return this.formValue.get('manager_Area');
  }
  get manager_Computer() {
    return this.formValue.get('manager_Computer');
  }  
  get computer() {
    return this.formValue.get('computer');
  }
  get motherBoard() {
    return this.formValue.get('motherBoard');
  }
  get keyboard() {
    return this.formValue.get('keyboard');
  }
  get mouse() {
    return this.formValue.get('mouse');
  }
  get monitor() {
    return this.formValue.get('monitor');
  }
  get ups() {
    return this.formValue.get('ups');
  }
  get network() {
    return this.formValue.get('network');
  }
  get printer() {
    return this.formValue.get('printer');
  }
  get speaker() {
    return this.formValue.get('speaker');
  }
  get tower() {
    return this.formValue.get('tower');
  }
}
