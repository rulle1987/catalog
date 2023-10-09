import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HDDData } from 'src/app/models/hdd.model'; 

@Component({
  selector: 'app-hdds',
  templateUrl: './hdds.component.html',
  styleUrls: ['./hdds.component.css']
})
export class HddsComponent implements OnInit {

  //Variables
  itemList: any = [];
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any;
  ModalTitle: string = "";

  //Filtros
  HDDModelFilter:string = "";
  HDDBrandFilter:string = "";
  HDDSizeFilter:string = "";
  HDDPartitionsFilter:string = "";
  HDDSerialNumberFilter:string = "";  
  HDDOrigenFilter:string = "";

  HDDListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    partitions: new FormControl('', Validators.required),
    serial_Number: new FormControl('', Validators.required),
    origen: new FormControl('', Validators.required),
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getHDDList().subscribe(res =>{
      this.itemList = res;
      this.HDDListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar Disco Duro";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {

    if(this.formValue.valid) {

      this.service.addHDD(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
      
        this.loadList();

      });
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar Disco Duro";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getHDDById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),
          model: new FormControl(this.editData.model, { validators: [Validators.required ], updateOn: 'blur' }),
          brand: new FormControl(this.editData.brand, { validators: [Validators.required ], updateOn: 'blur' }),
          size: new FormControl(this.editData.size, { validators: [Validators.required ], updateOn: 'blur' }),
          partitions: new FormControl(this.editData.partitions, { validators: [Validators.required ], updateOn: 'blur' }),
          serial_Number: new FormControl(this.editData.serial_Number, { validators: [Validators.required ], updateOn: 'blur' }),
          origen: new FormControl(this.editData.origen)
        })
      }
    });   
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      const item: HDDData = {
        id: this.formValue.value.id,
        model: this.formValue.value.model,
        brand: this.formValue.value.brand,
        size: this.formValue.value.size,
        partitions: this.formValue.value.partitions,
        serial_Number: this.formValue.value.serial_Number,    
        origen: this.formValue.value.origen
      }
      
      this.service.updateHDD(item, item.id).subscribe(res => {
  
        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();
  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deleteHDD(data.id).subscribe(res => {      
      this.loadList();
    })
  }

  // Controles del formulario
  get model() {
    return this.formValue.get('model');
  }
  get brand() {
    return this.formValue.get('brand');
  }
  get size() {
    return this.formValue.get('size');
  }
  get partitions() {
    return this.formValue.get('partitions');
  }
  get serial_Number() {
    return this.formValue.get('serial_Number');
  }
  get origen() {
    return this.formValue.get('origen');
  }

  // Filtros
  FilterFn() {
    var HDDModelFilter = this.HDDModelFilter;
    var HDDBrandFilter = this.HDDBrandFilter;
    var HDDSizeFilter = this.HDDSizeFilter;
    var HDDPartitionsFilter = this.HDDPartitionsFilter;
    var HDDSerialNumberFilter = this.HDDSerialNumberFilter;
    var HDDOrigenFilter = this.HDDOrigenFilter;

    this.itemList = this.HDDListWithOutFilter.filter(function (el:any) {

      return el.model.toString().toLowerCase().includes(
        HDDModelFilter.toString().trim().toLowerCase()
      )&&
      el.brand.toString().toLowerCase().includes(
        HDDBrandFilter.toString().trim().toLowerCase()
      )&&
      el.size.toString().toLowerCase().includes(
        HDDSizeFilter.toString().trim().toLowerCase()
      )&&
      el.partitions.toString().toLowerCase().includes(
        HDDPartitionsFilter.toString().trim().toLowerCase()
      )&&
      el.serial_Number.toString().toLowerCase().includes(
        HDDSerialNumberFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        HDDOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.HDDListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}
