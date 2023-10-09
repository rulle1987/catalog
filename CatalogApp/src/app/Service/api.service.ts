import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly APIUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  //Computers
  addComputer(data: any) {
    return this.http.post<any>(this.APIUrl + "computers", data).pipe(map((res:any) => {
      return res;
    }))
  }

  getComputersList() {
    return this.http.get<any>(this.APIUrl + "computers").pipe(map((res:any) => {
      return res;
    }))
  }

  getComputerById(id: string) {
    return this.http.get<any>(this.APIUrl + "computers/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  updateComputer(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "computers/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }

  deleteComputer(id: string) {
    return this.http.delete(this.APIUrl + "computers/" + id).pipe(map((res:any) => {
      return res;
    }))
  }  

  //Monitors
  addMonitor(data: any) {
    return this.http.post<any>(this.APIUrl + "monitors", data).pipe(map((res:any) => {
      return res;
    }))
  }

  getMonitorsList() {
    return this.http.get<any>(this.APIUrl + "monitors").pipe(map((res:any) => {
      return res;
    }))
  }

  getMonitorById(id: string) {
    return this.http.get<any>(this.APIUrl + "monitors/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  updateMonitor(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "monitors/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }

  deleteMonitor(id: string) {
    return this.http.delete(this.APIUrl + "monitors/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  //Keyboards
  addKeyboard(data: any) {
    return this.http.post<any>(this.APIUrl + "keyboards", data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  getKeyboardsList() {
    return this.http.get<any>(this.APIUrl + "keyboards").pipe(map((res:any) => {
      return res;
    }))
  }

  getKeyboardById(id: string) {
    return this.http.get<any>(this.APIUrl + "keyboards/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  updateKeyboard(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "keyboards/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  deleteKeyboard(id: string) {
    return this.http.delete(this.APIUrl + "keyboards/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Printers
  addPrinter(data: any) {
    return this.http.post<any>(this.APIUrl + "printers", data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  getPrintersList() {
    return this.http.get<any>(this.APIUrl + "printers").pipe(map((res:any) => {
      return res;
    }))
  }

  getPrinterById(id: string) {
    return this.http.get<any>(this.APIUrl + "printers/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  updatePrinter(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "printers/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  deletePrinter(id: string) {
    return this.http.delete(this.APIUrl + "printers/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Mouses
  addMouse(data: any) {
    return this.http.post<any>(this.APIUrl + "mouses", data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  getMousesList() {
    return this.http.get<any>(this.APIUrl + "mouses").pipe(map((res:any) => {
      return res;
    }))
  }

  getMouseById(id: string) {
    return this.http.get<any>(this.APIUrl + "mouses/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  updateMouse(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "mouses/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  deleteMouse(id: string) {
    return this.http.delete(this.APIUrl + "mouses/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //UPS
  addUps(data: any) {
    return this.http.post<any>(this.APIUrl + "ups", data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  getUpsList() {
    return this.http.get<any>(this.APIUrl + "ups").pipe(map((res:any) => {
      return res;
    }))
  }

  getUpsById(id: string) {
    return this.http.get<any>(this.APIUrl + "ups/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  updateUps(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "ups/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  deleteUps(id: string) {
    return this.http.delete(this.APIUrl + "ups/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Motherboards
  addMotherboard(data: any) {
    return this.http.post<any>(this.APIUrl + "motherboards", data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  getMotherboardList() {
    return this.http.get<any>(this.APIUrl + "motherboards").pipe(map((res:any) => {
      return res;
    }))
  }

  getMotherboardById(id: string) {
    return this.http.get<any>(this.APIUrl + "motherboards/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  updateMotherboard(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "motherboards/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  deleteMotherboard(id: string) {
    return this.http.delete(this.APIUrl + "motherboards/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Networks
  addNetwork(data: any) {
    return this.http.post<any>(this.APIUrl + "networks", data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  getNetworkList() {
    return this.http.get<any>(this.APIUrl + "networks").pipe(map((res:any) => {
      return res;
    }))
  }

  getNetworkById(id: string) {
    return this.http.get<any>(this.APIUrl + "networks/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  updateNetwork(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "networks/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  deleteNetwork(id: string) {
    return this.http.delete(this.APIUrl + "networks/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Disks
  addHDD(data: any) {
    return this.http.post<any>(this.APIUrl + "disks", data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  getHDDList() {
    return this.http.get<any>(this.APIUrl + "disks").pipe(map((res:any) => {
      return res;
    }))
  }

  getHDDById(id: string) {
    return this.http.get<any>(this.APIUrl + "disks/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
  
  updateHDD(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "disks/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  
  deleteHDD(id: string) {
    return this.http.delete(this.APIUrl + "disks/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Towers
  addTower(data: any) {
    return this.http.post<any>(this.APIUrl + "towers", data).pipe(map((res:any) => {
      return res;
    }))
  }

  getTowersList() {
    return this.http.get<any>(this.APIUrl + "towers").pipe(map((res:any) => {
      return res;
    }))
  }

  getTowerById(id: string) {
    return this.http.get<any>(this.APIUrl + "towers/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  updateTower(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "towers/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }

  deleteTower(id: string) {
    return this.http.delete(this.APIUrl + "towers/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //RAMs
  addRAM(data: any) {
    return this.http.post<any>(this.APIUrl + "rams", data).pipe(map((res:any) => {
      return res;
    }))
  }

  getRAMsList() {
    return this.http.get<any>(this.APIUrl + "rams").pipe(map((res:any) => {
      return res;
    }))
  }

  getRAMById(id: string) {
    return this.http.get<any>(this.APIUrl + "rams/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  updateRAM(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "rams/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }

  deleteRAM(id: string) {
    return this.http.delete(this.APIUrl + "rams/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Speakers
  addSpeaker(data: any) {
    return this.http.post<any>(this.APIUrl + "speakers", data).pipe(map((res:any) => {
      return res;
    }))
  }

  getSpeakersList() {
    return this.http.get<any>(this.APIUrl + "speakers").pipe(map((res:any) => {
      return res;
    }))
  }

  getSpeakerById(id: string) {
    return this.http.get<any>(this.APIUrl + "speakers/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  updateSpeaker(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "speakers/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }

  deleteSpeaker(id: string) {
    return this.http.delete(this.APIUrl + "files/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Files
  addFile(data: any) {
    return this.http.post<any>(this.APIUrl + "files", data).pipe(map((res:any) => {
      return res;
    }))
  }

  getFilesList() {
    return this.http.get<any>(this.APIUrl + "files").pipe(map((res:any) => {
      return res;
    }))
  }

  getFileById(id: string) {
    return this.http.get<any>(this.APIUrl + "files/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  updateFile(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "files/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }

  deleteFile(id: string) {
    return this.http.delete(this.APIUrl + "files/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  //Prueba
  addPrueba(data: any) {
    return this.http.post<any>(this.APIUrl + "prueba", data).pipe(map((res:any) => {
      return res;
    }))
  }

  getPruebasList() {
    return this.http.get<any>(this.APIUrl + "prueba").pipe(map((res:any) => {
      return res;
    }))
  }

  getPruebaById(id: string) {
    return this.http.get<any>(this.APIUrl + "prueba/" + id).pipe(map((res:any) => {
      return res;
    }))
  }

  updatePrueba(data: any, id: string) {
    return this.http.put<any>(this.APIUrl + "prueba/" + id, data).pipe(map((res:any) => {
      return res;
    }))
  }

  deletePrueba(id: string) {
    return this.http.delete(this.APIUrl + "prueba/" + id).pipe(map((res:any) => {
      return res;
    }))
  }
}