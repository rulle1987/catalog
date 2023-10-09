import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NetworkData } from 'src/app/models/network.model';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  //Variables
  itemList: any = [];
  pathNotValue: string = "-----";
  showAdd!: boolean;
  showEdit: boolean = false;  
  editData:any; 
  ModalTitle: string = "";  
  prueba:string = "";

  //Filtros
  NetworkNetworkClassFilter:string = "";
  NetworkDominioFilter:string = "";
  NetworkIpAddressFilter:string = "";
  NetworkMacFilter:string = "";
  NetworkMaskFilter:string = "";
  NetworkGetAwayFilter:string = "";  
  NetworkPreferedDNSFilter:string = "";
  NetworkAlternativeDNSFilter:string = "";
  NetworkProxyFilter:string = "";
  NetworkMailSystemFilter:string = "";
  NetworkMailUserFilter:string = "";

  NetworkListWithOutFilter: any = [];

  constructor(private service: ApiService) { }

  ngOnInit(): void {        
    this.loadList();
  }

  // Formulario
  formValue = new FormGroup({
    id: new FormControl({value:'', disable:true}),
    network_Class: new FormControl('', Validators.required),    
    ipAddress: new FormControl('', Validators.required),
    mac: new FormControl('', Validators.required),
    mask: new FormControl('', Validators.required),
    get_Away: new FormControl('', Validators.required),
    prefered_DNS: new FormControl('', Validators.required),
    alternative_DNS: new FormControl('', Validators.required),
    proxy: new FormControl('', Validators.required),
    mail_System: new FormControl('', Validators.required),
    mail_User: new FormControl(''),
    dominio: new FormControl('')
  });

  // Cargar lista desde BD
  loadList() {
    this.service.getNetworkList().subscribe(res =>{
      this.itemList = res;
      this.NetworkListWithOutFilter = res;
    });
  }
  
  // Botón para lanzar el modal con el formulario
  clickAddItem() {
    this.formValue.reset();    
    this.ModalTitle = "Agregar Detalles de Red";
    this.showAdd = true;
    this.showEdit = false;
  }

  // Agregar
  addItem() {
    if(this.formValue.get('mail_User')?.value == null) {
      this.formValue.patchValue({mail_User: this.pathNotValue});
    }
    if(this.formValue.get('dominio')?.value == null) {
      this.formValue.patchValue({dominio: this.pathNotValue});
    }
    this.prueba = this.formValue.get('ip_Address')?.value;    

    if(this.formValue.valid) {

      this.service.addNetwork(this.formValue.value).subscribe(res => {
        console.log(this.prueba);
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();      
        this.loadList();

      });   
    }
  }

  // Editar
  editItem(id:any) {  

    this.ModalTitle = "Editar Detalles de Red";
    this.showAdd = false;
    this.showEdit = true;

    this.service.getNetworkById(id).subscribe(res => {
      this.editData = res;
      if(this.editData != null) {
        this.formValue = new FormGroup({
          id: new FormControl(this.editData.id),    
          network_Class: new FormControl(this.editData.network_Class, { validators: [Validators.required ], updateOn: 'blur' }),          
          ipAddress: new FormControl(this.editData.ipAddress, { validators: [Validators.required ], updateOn: 'blur' }),
          mac: new FormControl(this.editData.mac, { validators: [Validators.required ], updateOn: 'blur' }),
          mask: new FormControl(this.editData.mask, { validators: [Validators.required ], updateOn: 'blur' }),
          get_Away: new FormControl(this.editData.get_Away, { validators: [Validators.required ], updateOn: 'blur' }),
          prefered_DNS: new FormControl(this.editData.prefered_DNS, { validators: [Validators.required ], updateOn: 'blur' }),
          alternative_DNS: new FormControl(this.editData.alternative_DNS, { validators: [Validators.required ], updateOn: 'blur' }),
          proxy: new FormControl(this.editData.proxy, { validators: [Validators.required ], updateOn: 'blur' }),
          mail_System: new FormControl(this.editData.mail_System, { validators: [Validators.required ], updateOn: 'blur' }),
          mail_User: new FormControl(this.editData.mail_User),
          dominio: new FormControl(this.editData.dominio),
        })        
      }
      this.formValue.updateValueAndValidity();
    });   
  }

  // Actualizar 
  updateItem() {

    if(this.formValue.valid) {

      const item: NetworkData = {
        id: this.formValue.value.id,
        network_Class: this.formValue.value.network_Class,
        dominio: this.formValue.value.dominio,
        ipAddress: this.formValue.value.ipAddress,
        mac: this.formValue.value.mac,
        mask: this.formValue.value.mask,
        get_Away: this.formValue.value.get_Away,
        prefered_DNS: this.formValue.value.prefered_DNS,
        alternative_DNS: this.formValue.value.alternative_DNS,
        proxy: this.formValue.value.proxy,
        mail_System: this.formValue.value.mail_System,
        mail_User: this.formValue.value.mail_User
      }

      this.service.updateNetwork(item, item.id).subscribe(res => {
        let ref = document.getElementById('clear');      
        ref?.click();

        this.formValue.reset();      
        this.loadList();
  
      });
    }
  }

  deleteItem(data: any) {
    this.service.deleteNetwork(data.id).subscribe(res => {      
      this.loadList();
    })
  }

  // Controles del formulario
  get network_Class() {
    return this.formValue.get('network_Class');
  }
  get dominio() {
    return this.formValue.get('dominio');
  }
  get ipAddress() {
    return this.formValue.get('ipAddress');
  }
  get mac() {
    return this.formValue.get('mac');
  }
  get mask() {
    return this.formValue.get('mask');
  }
  get get_Away() {
    return this.formValue.get('get_Away');
  }
  get prefered_DNS() {
    return this.formValue.get('prefered_DNS');
  }
  get alternative_DNS() {
    return this.formValue.get('alternative_DNS');
  }
  get proxy() {
    return this.formValue.get('proxy');
  }
  get mail_System() {
    return this.formValue.get('mail_System');
  }
  get mail_User() {
    return this.formValue.get('mail_User');
  }

  // Filtros
  FilterFn() {
    var NetworkNetworkClassFilter = this.NetworkNetworkClassFilter;
    var NetworkDominioFilter = this.NetworkDominioFilter;    
    var NetworkIpAddressFilter = this.NetworkIpAddressFilter;
    var NetworkMacFilter = this.NetworkMacFilter;
    var NetworkMaskFilter = this.NetworkMaskFilter;
    var NetworkGetAwayFilter = this.NetworkGetAwayFilter;
    var NetworkPreferedDNSFilter = this.NetworkPreferedDNSFilter;
    var NetworkAlternativeDNSFilter = this.NetworkAlternativeDNSFilter;
    var NetworkProxyFilter = this.NetworkProxyFilter;
    var NetworkMailSystemFilter = this.NetworkMailSystemFilter;
    var NetworkMailUserFilter = this.NetworkMailUserFilter;

    this.itemList = this.NetworkListWithOutFilter.filter(function (el:any) {

      return el.network_Class.toString().toLowerCase().includes(
        NetworkNetworkClassFilter.toString().trim().toLowerCase()
      )&&
      el.dominio.toString().toLowerCase().includes(
        NetworkDominioFilter.toString().trim().toLowerCase()
      )&&
      el.IPAddress.toString().toLowerCase().includes(
        NetworkIpAddressFilter.toString().trim().toLowerCase()
      )&&
      el.mac.toString().toLowerCase().includes(
        NetworkMacFilter.toString().trim().toLowerCase()
      )&&
      el.mask.toString().toLowerCase().includes(
        NetworkMaskFilter.toString().trim().toLowerCase()
      )&&
      el.get_Away.toString().toLowerCase().includes(
        NetworkGetAwayFilter.toString().trim().toLowerCase()
      )&&
      el.prefered_DNS.toString().toLowerCase().includes(
        NetworkPreferedDNSFilter.toString().trim().toLowerCase()
      )&&
      el.altenartive_DNS.toString().toLowerCase().includes(
        NetworkAlternativeDNSFilter.toString().trim().toLowerCase()
      )&&
      el.proxy.toString().toLowerCase().includes(
        NetworkProxyFilter.toString().trim().toLowerCase()
      )&&
      el.mail_System.toString().toLowerCase().includes(
        NetworkMailSystemFilter.toString().trim().toLowerCase()
      )&&
      el.mail_User.toString().toLowerCase().includes(
        NetworkMailUserFilter.toString().trim().toLowerCase()
      )
    });
  }

  //Sorting
  sortResult(prop:any, asc:any) {
    this.itemList = this.NetworkListWithOutFilter.sort(function(a:any, b:any) {
      if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
      }else{
        return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
      }
    })
  }
}