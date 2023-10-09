import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PrinterData } from 'src/app/models/printer.model';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.css']
})
export class PrintersComponent implements OnInit {

  //Variables
  itemList: any = [];
  pathNotValue: string = "-----";
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any;
  ModalTitle: string = "";

  //Filtros
  PrinterModelFilter:string = "";
  PrinterBrandFilter:string = "";    
  PrinterSerialNumberFilter:string = "";  
  PrinterInventoryNumberFilter:string = "";  
  PrinterOrigenFilter:string = "";

  PrinterListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),    
    serial_Number: new FormControl('', Validators.required),
    inventory_Number: new FormControl(''),
    origen: new FormControl('', Validators.required)
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getPrintersList().subscribe(res =>{
      this.itemList = res;
      this.PrinterListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar Impresora";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {
    if(this.formValue.get('inventory_Number')?.value == null) {
      this.formValue.patchValue({inventory_Number: this.pathNotValue});
    }

    if(this.formValue.valid) {

      this.service.addPrinter(this.formValue.value).subscribe(res => {
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
      
        this.loadList();

      });
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar Impresora";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getPrinterById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),
          model: new FormControl(this.editData.model, { validators: [Validators.required ], updateOn: 'blur' }),
          brand: new FormControl(this.editData.brand, { validators: [Validators.required ], updateOn: 'blur' }),          
          serial_Number: new FormControl(this.editData.serial_Number, { validators: [Validators.required ], updateOn: 'blur' }),
          inventory_Number: new FormControl(this.editData.inventory_Number),
          origen: new FormControl(this.editData.origen)
        })
      }
    });   
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      const item: PrinterData = {
        id: this.formValue.value.id,
        model: this.formValue.value.model,
        brand: this.formValue.value.brand,
        serial_Number: this.formValue.value.serial_Number,
        inventory_Number: this.formValue.value.inventory_Number,
        origen: this.formValue.value.origen
      }
      
      this.service.updatePrinter(item, item.id).subscribe(res => {
  
        let ref = document.getElementById('clear');      
        ref?.click();
  
        this.formValue.reset();      
        this.loadList();
  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deletePrinter(data.id).subscribe(res => {      
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
    var PrinterBrandFilter = this.PrinterBrandFilter;
    var PrinterModelFilter = this.PrinterModelFilter;
    var PrinterSerialNumberFilter = this.PrinterSerialNumberFilter;
    var PrinterInventoryNumberFilter = this.PrinterInventoryNumberFilter;
    var PrinterOrigenFilter = this.PrinterOrigenFilter;

    this.itemList = this.PrinterListWithOutFilter.filter(function (el:any) {

      return el.brand.toString().toLowerCase().includes(
        PrinterBrandFilter.toString().trim().toLowerCase()
      )&&
      el.model.toString().toLowerCase().includes(
        PrinterModelFilter.toString().trim().toLowerCase()
      )&&
      el.serial_Number.toString().toLowerCase().includes(
        PrinterSerialNumberFilter.toString().trim().toLowerCase()
      )&&
      el.inventory_Number.toString().toLowerCase().includes(
        PrinterInventoryNumberFilter.toString().trim().toLowerCase()
      )&&
      el.origen.toString().toLowerCase().includes(
        PrinterOrigenFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.PrinterListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}