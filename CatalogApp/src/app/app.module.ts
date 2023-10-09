// Dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { FilesComponent } from './Components/files/files.component';
import { MonitorsComponent } from './Components/monitors/monitors.component';
import { PrintersComponent } from './Components/printers/printers.component';
import { ComputersComponent } from './Components/computers/computers.component';
import { KeyboardsComponent } from './Components/keyboards/keyboards.component';
import { MousesComponent } from './Components/mouses/mouses.component';
import { HddsComponent } from './Components/hdds/hdds.component';
import { NetworkComponent } from './Components/network/network.component';
import { UpsComponent } from './Components/ups/ups.component';
import { MotherboardsComponent } from './Components/motherboards/motherboards.component';

// Services
import { ApiService } from './Service/api.service';
import { TowersComponent } from './Components/towers/towers.component';
import { RamsComponent } from './Components/rams/rams.component';
import { SpeakersComponent } from './Components/speakers/speakers.component';
import { PruebaComponent } from './Components/prueba/prueba.component';

@NgModule({
  declarations: [
    AppComponent,
    MonitorsComponent,
    PrintersComponent,
    FilesComponent,
    ComputersComponent,
    KeyboardsComponent,
    MousesComponent,
    HddsComponent,
    NetworkComponent,
    UpsComponent,
    MotherboardsComponent,
    TowersComponent,
    RamsComponent,
    SpeakersComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
