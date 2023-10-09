import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PruebaData } from 'src/app/models/prueba';
import { ComputerData } from 'src/app/models/computer.model';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  //Variables
  itemList: any = [];
  pathNotValue: string = "-----";
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any;
  ModalTitle: string = "";  

  result:any;

  computerList: any = [];

  itemsPrueba: any = ['Agro-Meteorología', 'Pronóstico', 'Dirección', 'Economía'];

  res:any;
  resultOther:any;

  constructor(private service: ApiService) { }

  ngOnInit(): void {            
    this.loadAllList();
  }

  // Formulario
  formValue = new FormGroup({    
    computer: new FormControl(''),
    items: new FormControl('')
  });

  loadAllList() {
    this.service.getComputersList().subscribe(res => {
      this.computerList = res;
    });
    this.service.getPruebasList().subscribe(res => {
      this.itemList = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Prueba";
    this.showAdd = true;
    this.showEdit = false;
  }
  
  // Agregar
  addItem() {

    if(this.formValue.valid) {

      this.service.getComputerById(this.formValue.get('computer')?.value).subscribe(res => {
        this.result = res;
        const prueba: PruebaData = {
          computer:{
            id: this.result.id,
            computer_Name: this.result.computer_Name,
            operative_System: this.result.operative_System,
            service_Pack: this.result.service_Pack,
            antivirus: this.result.antivirus,
            serial_Number: this.result.serial_Number,
            inventory_Number: this.result.inventory_Number,
            sealed: this.result.sealed,
            origen: this.result.origen
          },
          items:['stream']
        };    
        this.service.addPrueba(prueba).subscribe(res => {
          let ref = document.getElementById('clear');
          ref?.click();

          this.formValue.reset();      
          this.loadAllList();
        });
      });
    }
  }


  // Controles del formulario
  get computer() {
    return this.formValue.get('computer');
  }
  get items() {
    return this.formValue.get('items');
  }
}