import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComputerData } from 'src/app/models/computer.model';  


@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {

  //Variables 
  itemList: any = [];
  pathNotValue: string = "-----";
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any; 
  ModalTitle: string = ""; 

  //Filtros
  ComputerNameFilter:string = "";
  ComputerOperativeSystemFilter:string = "";
  ComputerServicePackFilter:string = "";
  ComputerAntivirusFilter:string = "";
  ComputerSerialNumberFilter:string = "";
  ComputerInventoryNumberFilter:string = "";
  ComputerOrigenFilter:string = "";

  ComputerListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    computer_Name: new FormControl('', Validators.required),
    operative_System: new FormControl('', Validators.required),
    service_Pack: new FormControl('', Validators.required),
    antivirus: new FormControl('', Validators.required),
    serial_Number: new FormControl(''),
    inventory_Number: new FormControl(''),
    sealed: new FormControl(false),
    origen: new FormControl('', Validators.required)    
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getComputersList().subscribe(res =>{
      this.itemList = res;
      this.ComputerListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar Detalles";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {
    if(this.formValue.get('serial_Number')?.value == null) {
      this.formValue.patchValue({serial_Number: this.pathNotValue});
    }
    if(this.formValue.get('inventory_Number')?.value == null) {
      this.formValue.patchValue({inventory_Number: this.pathNotValue});
    }
    if(this.sealed != true) {
      this.formValue.patchValue({sealed: false});
    }

    if(this.formValue.valid) {

      this.service.addComputer(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();      
        this.loadList();

      });   
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar Computadora";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getComputerById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),
          computer_Name: new FormControl(this.editData.computer_Name, { validators: [Validators.required ], updateOn: 'blur' }),
          operative_System: new FormControl(this.editData.operative_System, { validators: [Validators.required ], updateOn: 'blur' }),
          service_Pack: new FormControl(this.editData.service_Pack, { validators: [Validators.required ], updateOn: 'blur' }),
          antivirus: new FormControl(this.editData.antivirus, { validators: [Validators.required ], updateOn: 'blur' }),
          serial_Number: new FormControl(this.editData.serial_Number),
          inventory_Number: new FormControl(this.editData.inventory_Number),
          sealed: new FormControl(this.editData.sealed),
          origen: new FormControl(this.editData.origen, { validators: [Validators.required ], updateOn: 'blur' })
        })        
      }
      this.formValue.updateValueAndValidity();
    });   
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      const item: ComputerData = {
        id: this.formValue.value.id,
        computer_Name: this.formValue.value.computer_Name,
        operative_System: this.formValue.value.operative_System,
        service_Pack: this.formValue.value.service_Pack,
        antivirus: this.formValue.value.antivirus,
        serial_Number: this.formValue.value.serial_Number,
        inventory_Number: this.formValue.value.inventory_Number,
        origen: this.formValue.value.origen,
        sealed: this.formValue.value.sealed
      }

      this.service.updateComputer(item, item.id).subscribe(res => {        
        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();
  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deleteComputer(data.id).subscribe(res => {      
      this.loadList();
    })
  } 

  // Controles del formulario
  get computer_Name() {
    return this.formValue.get('computer_Name');
  }
  get operative_System() {
    return this.formValue.get('operative_System');
  }
  get service_Pack() {
    return this.formValue.get('service_Pack');
  }
  get antivirus() {
    return this.formValue.get('antivirus');
  }
  get serial_Number() {
    return this.formValue.get('serial_Number');
  }
  get inventory_Number() {
    return this.formValue.get('inventory_Number');
  }
  get origen() {
    return this.formValue.get('origen');
  }
  get sealed() {
    return this.formValue.get('sealed')?.value;
  }

  // Filtros
  FilterFn() {
    var ComputerNameFilter = this.ComputerNameFilter;
    var ComputerOperativeSystemFilter = this.ComputerOperativeSystemFilter;    
    var ComputerServicePackFilter = this.ComputerServicePackFilter;
    var ComputerAntivirusFilter = this.ComputerAntivirusFilter;
    var ComputerSerialNumberFilter = this.ComputerSerialNumberFilter;
    var ComputerInventoryNumberFilter = this.ComputerInventoryNumberFilter;
    var ComputerOrigenFilter = this.ComputerOrigenFilter;

    this.itemList = this.ComputerListWithOutFilter.filter(function (el:any) {

      return el.computer_Name.toString().toLowerCase().includes(
        ComputerNameFilter.toString().trim().toLowerCase()
      )&&
      el.operative_System.toString().toLowerCase().includes(
        ComputerOperativeSystemFilter.toString().trim().toLowerCase()
      )&&
      el.service_Pack.toString().toLowerCase().includes(
        ComputerServicePackFilter.toString().trim().toLowerCase()
      )&&
      el.antivirus.toString().toLowerCase().includes(
        ComputerAntivirusFilter.toString().trim().toLowerCase()
      )&&
      el.serial_Number.toString().toLowerCase().includes(
        ComputerSerialNumberFilter.toString().trim().toLowerCase()
      )&&
      el.inventory_Number.toString().toLowerCase().includes(
        ComputerInventoryNumberFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        ComputerOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.ComputerListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}
