import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpeakerData } from 'src/app/models/speaker.model';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.css']
})
export class SpeakersComponent implements OnInit {

  //Variables
  itemList: any = [];
  pathNotValue: string = "-----";
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any; 
  ModalTitle: string = "";

  //Filtros
  SpeakerBrandFilter:string = "";
  SpeakerModelFilter:string = "";
  SpeakerSerialNumberFilter:string = "";
  SpeakerInventoryNumberFilter:string = "";
  SpeakerOrigenFilter:string = "";

  SpeakerListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    serial_Number: new FormControl(),
    inventory_Number: new FormControl(''),
    origen: new FormControl('', Validators.required)
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getSpeakersList().subscribe(res =>{
      this.itemList = res;
      this.SpeakerListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar Speaker";
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

    if(this.formValue.valid) {

      this.service.addSpeaker(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();      
        this.loadList();

      });   
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar Speaker";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getMonitorById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),
          brand: new FormControl(this.editData.brand, { validators: [Validators.required ], updateOn: 'blur' }),
          model: new FormControl(this.editData.model, { validators: [Validators.required ], updateOn: 'blur' }),
          serial_Number: new FormControl(this.editData.serial_Number),
          inventory_Number: new FormControl(this.editData.inventory_Number),
          origen: new FormControl(this.editData.origen, { validators: [Validators.required ], updateOn: 'blur' })           
        })        
      }
      this.formValue.updateValueAndValidity();
    });   
  }

  // Actualizar 
  updateItem() {
    
    if(this.formValue.valid) {

      const item: SpeakerData = {
        id: this.formValue.value.id,
        brand: this.formValue.value.brand,
        model: this.formValue.value.model,
        serial_Number: this.formValue.value.serial_Number,
        inventory_Number: this.formValue.value.inventory_Number,
        origen: this.formValue.value.origen
      }

      this.service.updateSpeaker(item, item.id).subscribe(res => {
        let ref = document.getElementById('clear');      
        ref?.click();

        this.formValue.reset();      
        this.loadList();  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deleteSpeaker(data.id).subscribe(res => {      
      this.loadList();
    })
  }

  // Controles del formulario
  get brand() {
    return this.formValue.get('brand');
  }
  get model() {
    return this.formValue.get('model');
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

  // Filtros
  FilterFn() {
    var SpeakerBrandFilter = this.SpeakerBrandFilter;
    var SpeakerModelFilter = this.SpeakerModelFilter;
    var SpeakerSerialNumberFilter = this.SpeakerSerialNumberFilter;
    var SpeakerInventoryNumberFilter = this.SpeakerInventoryNumberFilter;
    var SpeakerOrigenFilter = this.SpeakerOrigenFilter;

    this.itemList = this.SpeakerListWithOutFilter.filter(function (el:any) {

      return el.brand.toString().toLowerCase().includes(
        SpeakerBrandFilter.toString().trim().toLowerCase()
      )&&
      el.model.toString().toLowerCase().includes(
        SpeakerModelFilter.toString().trim().toLowerCase()
      )&&
      el.serial_Number.toString().toLowerCase().includes(
        SpeakerSerialNumberFilter.toString().trim().toLowerCase()
      )&&
      el.inventory_Number.toString().toLowerCase().includes(
        SpeakerInventoryNumberFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        SpeakerOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.SpeakerListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}