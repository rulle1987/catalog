import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MotherBoardData } from 'src/app/models/motherboard.model';

@Component({
  selector: 'app-motherboards',
  templateUrl: './motherboards.component.html',
  styleUrls: ['./motherboards.component.css']
})
export class MotherboardsComponent implements OnInit {

  //Variables
  itemList: any = [];
  pathNotValue: string = "-----";
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any;
  messageClass = "";
  message:string = "";   
  ModalTitle: string = "";

  //Filtros
  MotherBoardNameFilter:string = "";
  MotherBoardManufacterFilter:string = "";
  MotherBoardProductFilter:string = "";
  MotherBoardMicroFilter:string = "";  
  MotherBoardOrigenFilter:string = "";  


  MotherBoardListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    name: new FormControl('', Validators.required),
    manufacter: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    micro: new FormControl('', Validators.required),
    origen: new FormControl('', Validators.required),
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getMotherboardList().subscribe(res =>{
      this.itemList = res;
      this.MotherBoardListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();
    this.message = "";
    this.ModalTitle = "Agregar MotherBoard";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {

    if(this.formValue.valid) {

      this.service.addMotherboard(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();      
        this.loadList();

      });   
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar MotherBoard";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getMotherboardById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),
          name: new FormControl(this.editData.name, { validators: [Validators.required ], updateOn: 'blur' }),
          manufacter: new FormControl(this.editData.manufacter, { validators: [Validators.required ], updateOn: 'blur' }),
          product: new FormControl(this.editData.product, { validators: [Validators.required ], updateOn: 'blur' }),
          micro: new FormControl(this.editData.micro, { validators: [Validators.required ], updateOn: 'blur' }),
          origen: new FormControl(this.editData.origen, { validators: [Validators.required ], updateOn: 'blur' }),
        })        
      }
      this.formValue.updateValueAndValidity();
    });   
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      const item: MotherBoardData = {
        id: this.formValue.value.id,
        name: this.formValue.value.name,
        manufacter: this.formValue.value.manufacter,
        product: this.formValue.value.product,
        micro: this.formValue.value.micro,
        origen: this.formValue.value.origen
      }

      this.service.updateMotherboard(item,item.id).subscribe(res => {
        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();
  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deleteMotherboard(data.id).subscribe(res => {      
      this.loadList();
    })
  }

  // Controles del formulario
  get name() {
    return this.formValue.get('name');
  }
  get manufacter() {
    return this.formValue.get('manufacter');
  }
  get product() {
    return this.formValue.get('product');
  }
  get micro() {
    return this.formValue.get('micro');
  }
  get origen() {
    return this.formValue.get('micro');
  }

  // Filtros
  FilterFn() {
    var MotherBoardNameFilter = this.MotherBoardNameFilter;
    var MotherBoardManufacterFilter = this.MotherBoardManufacterFilter;    
    var MotherBoardProductFilter = this.MotherBoardProductFilter;
    var MotherBoardMicroFilter = this.MotherBoardMicroFilter;
    var MotherBoardOrigenFilter = this.MotherBoardOrigenFilter;

    this.itemList = this.MotherBoardListWithOutFilter.filter(function (el:any) {

      return el.name.toString().toLowerCase().includes(
        MotherBoardNameFilter.toString().trim().toLowerCase()
      )&&
      el.manufacter.toString().toLowerCase().includes(
        MotherBoardManufacterFilter.toString().trim().toLowerCase()
      )&&
      el.product.toString().toLowerCase().includes(
        MotherBoardProductFilter.toString().trim().toLowerCase()
      )&&
      el.micro.toString().toLowerCase().includes(
        MotherBoardMicroFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        MotherBoardOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.MotherBoardListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}