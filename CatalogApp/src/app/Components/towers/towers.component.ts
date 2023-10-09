import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TowerData } from 'src/app/models/tower.model';

@Component({
  selector: 'app-towers',
  templateUrl: './towers.component.html',
  styleUrls: ['./towers.component.css']
})
export class TowersComponent implements OnInit {

  //Variables
  itemList: any = [];
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any;
  ModalTitle: string = "";

  //Filtros  
  TowerBrandFilter:string = "";
  TowerSerialNumberFilter:string = "";  
  TowerOrigenFilter:string = "";

  TowerListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    brand: new FormControl('', Validators.required),
    serial_Number: new FormControl('', Validators.required),
    origen: new FormControl('', Validators.required),
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getTowersList().subscribe(res =>{
      this.itemList = res;
      this.TowerListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar Torre";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {

    if(this.formValue.valid) {

      this.service.addTower(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
      
        this.loadList();

      });
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar Torre";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getTowerById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),          
          brand: new FormControl(this.editData.brand, { validators: [Validators.required ], updateOn: 'blur' }),
          serial_Number: new FormControl(this.editData.serial_Number, { validators: [Validators.required ], updateOn: 'blur' }),
          origen: new FormControl(this.editData.origen, { validators: [Validators.required ], updateOn: 'blur' })
        })
      }
    });   
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      const item: TowerData = {
        id: this.formValue.value.id,
        brand: this.formValue.value.brand,
        serial_Number: this.formValue.value.serial_Number,
        origen: this.formValue.value.origen
      }

      this.service.updateTower(item, item.id).subscribe(res => {

        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deleteTower(data.id).subscribe(res => {      
      this.loadList();
    })
  }

  // Controles del formulario
  get brand() {
    return this.formValue.get('brand');
  }
  get serial_Number() {
    return this.formValue.get('serial_Number');
  }
  get origen() {
    return this.formValue.get('origen');
  }

  // Filtros
  FilterFn() {
    var TowerBrandFilter = this.TowerBrandFilter;
    var TowerSerialNumberFilter = this.TowerSerialNumberFilter;    
    var TowerOrigenFilter = this.TowerOrigenFilter;

    this.itemList = this.TowerListWithOutFilter.filter(function (el:any) {

      return el.brand.toString().toLowerCase().includes(
        TowerBrandFilter.toString().trim().toLowerCase()
      )&&
      el.serial_Number.toString().toLowerCase().includes(
        TowerSerialNumberFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        TowerOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.TowerListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}