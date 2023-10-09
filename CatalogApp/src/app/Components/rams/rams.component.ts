import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RAMData } from 'src/app/models/ram.model';

@Component({
  selector: 'app-rams',
  templateUrl: './rams.component.html',
  styleUrls: ['./rams.component.css']
})
export class RamsComponent implements OnInit {

  //Variables
  itemList: any = [];
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any;
  ModalTitle: string = "";

  //Filtros
  RAMTypeFilter:string = "";
  RAMSizeFilter:string = "";  
  RAMVelocityFilter:string = "";
  RAMSerialNumberFilter:string = "";
  RAMOrigenFilter:string = "";

  RAMListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),    
    type: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    velocity: new FormControl('', Validators.required),
    serial_Number: new FormControl('', Validators.required),
    origen: new FormControl('', Validators.required)
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getRAMsList().subscribe(res =>{
      this.itemList = res;
      this.RAMListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar RAM";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {

    if(this.formValue.valid) {

      this.service.addRAM(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
      
        this.loadList();

      });
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar RAM";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getRAMById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),          
          type: new FormControl(this.editData.type, { validators: [Validators.required ], updateOn: 'blur' }),
          size: new FormControl(this.editData.size, { validators: [Validators.required ], updateOn: 'blur' }),
          velocity: new FormControl(this.editData.velocity, { validators: [Validators.required ], updateOn: 'blur' }),
          serial_Number: new FormControl(this.editData.serial_Number, { validators: [Validators.required ], updateOn: 'blur' }),
          origen: new FormControl(this.editData.origen, { validators: [Validators.required ], updateOn: 'blur' })
        })
      }
    });   
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      const item: RAMData = {
        id: this.formValue.value.id,
        type: this.formValue.value.type,
        size: this.formValue.value.size,
        velocity: this.formValue.value.velocity,
        serial_Number: this.formValue.value.serial_Number,
        origen: this.formValue.value.origen
      }

      this.service.updateRAM(item, item.id).subscribe(res => {

        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();
  
      })
    }
  }

  deleteItem(data: any) {
    this.service.deleteRAM(data.id).subscribe(res => {      
      this.loadList();
    })
  }

  // Controles del formulario
  get type() {
    return this.formValue.get('type');
  }  
  get size() {
    return this.formValue.get('size');
  }
  get velocity() {
    return this.formValue.get('velocity');
  }
  get serial_Number() {
    return this.formValue.get('serial_Number');
  }
  get origen() {
    return this.formValue.get('origen');
  }

  // Filtros
  FilterFn() {
    var RAMTypeFilter = this.RAMTypeFilter;
    var RAMSizeFilter = this.RAMSizeFilter;
    var RAMVelocityFilter = this.RAMVelocityFilter;
    var RAMSerialNumberFilter = this.RAMSerialNumberFilter;    
    var RAMOrigenFilter = this.RAMOrigenFilter;

    this.itemList = this.RAMListWithOutFilter.filter(function (el:any) {

      return el.type.toString().toLowerCase().includes(
        RAMTypeFilter.toString().trim().toLowerCase()
      )&&
      el.size.toString().toLowerCase().includes(
        RAMSizeFilter.toString().trim().toLowerCase()
      )&&
      el.velocity.toString().toLowerCase().includes(
        RAMVelocityFilter.toString().trim().toLowerCase()
      )&&
      el.serial_Number.toString().toLowerCase().includes(
        RAMSerialNumberFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        RAMOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.RAMListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}
