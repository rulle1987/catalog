import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeyboardData } from 'src/app/models/keyboard.model';

@Component({
  selector: 'app-keyboards',
  templateUrl: './keyboards.component.html',
  styleUrls: ['./keyboards.component.css']
})
export class KeyboardsComponent implements OnInit {

  //Variables
  itemList: any = [];
  pathNotValue: string = "-----";
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any; 
  ModalTitle: string = "";

  //Filtros
  KeyboardBrandFilter:string = "";
  KeyboardModelFilter:string = "";
  KeyboardTypeFilter:string = "";
  KeyboardSerialNumberFilter:string = "";
  KeyboardInventoryNumberFilter:string = "";
  KeyboardOrigenFilter:string = "";

  KeyboardListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    serial_Number: new FormControl('', Validators.required),
    inventory_Number: new FormControl(''),
    origen: new FormControl('', Validators.required)
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getKeyboardsList().subscribe(res =>{
      this.itemList = res;
      this.KeyboardListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar Teclado";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {    
    if(this.formValue.get('inventory_Number')?.value == null) {
      this.formValue.patchValue({inventory_Number: this.pathNotValue});
    }

    if(this.formValue.valid) {

      this.service.addKeyboard(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();      
        this.loadList();

      });   
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar Teclado";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getKeyboardById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),
          brand: new FormControl(this.editData.brand, { validators: [Validators.required ], updateOn: 'blur' }),
          model: new FormControl(this.editData.model, { validators: [Validators.required ], updateOn: 'blur' }),
          type: new FormControl(this.editData.type, { validators: [Validators.required ], updateOn: 'blur' }),
          serial_Number: new FormControl(this.editData.serial_Number, { validators: [Validators.required ], updateOn: 'blur' }),
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

      const item: KeyboardData = {
        id: this.formValue.value.id,
        brand: this.formValue.value.brand,
        model: this.formValue.value.model,
        type: this.formValue.value.type,
        serial_Number: this.formValue.value.serial_Number,
        inventory_Number: this.formValue.value.inventory_Number,
        origen: this.formValue.value.origen
      }

      this.service.updateKeyboard(item, item.id).subscribe(res => {
        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();
  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deleteKeyboard(data.id).subscribe(res => {      
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
  get type() {
    return this.formValue.get('type');
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
    var KeyboardBrandFilter = this.KeyboardBrandFilter;
    var KeyboardModelFilter = this.KeyboardModelFilter;
    var KeyboardTypeFilter = this.KeyboardTypeFilter;
    var KeyboardSerialNumberFilter = this.KeyboardSerialNumberFilter;
    var KeyboardInventoryNumberFilter = this.KeyboardInventoryNumberFilter;
    var KeyboardOrigenFilter = this.KeyboardOrigenFilter;

    this.itemList = this.KeyboardListWithOutFilter.filter(function (el:any) {

      return el.brand.toString().toLowerCase().includes(
        KeyboardBrandFilter.toString().trim().toLowerCase()
      )&&
      el.model.toString().toLowerCase().includes(
        KeyboardModelFilter.toString().trim().toLowerCase()
      )&&
      el.type.toString().toLowerCase().includes(
        KeyboardTypeFilter.toString().trim().toLowerCase()
      )&&
      el.serial_Number.toString().toLowerCase().includes(
        KeyboardSerialNumberFilter.toString().trim().toLowerCase()
      )&&
      el.inventory_Number.toString().toLowerCase().includes(
        KeyboardInventoryNumberFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        KeyboardOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.KeyboardListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
} 