// Dependencies
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { UpsComponent } from './Components/ups/ups.component';
import { ComputersComponent } from './Components/computers/computers.component';
import { FilesComponent } from './Components/files/files.component';
import { HddsComponent } from './Components/hdds/hdds.component';
import { KeyboardsComponent } from './Components/keyboards/keyboards.component';
import { MonitorsComponent } from './Components/monitors/monitors.component';
import { MousesComponent } from './Components/mouses/mouses.component';
import { NetworkComponent } from './Components/network/network.component';
import { PrintersComponent } from './Components/printers/printers.component';
import { MotherboardsComponent } from './Components/motherboards/motherboards.component';
import { TowersComponent } from './Components/towers/towers.component';
import { RamsComponent } from './Components/rams/rams.component';
import { SpeakersComponent } from './Components/speakers/speakers.component';
import { PruebaComponent } from './Components/prueba/prueba.component';

const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'files', component: FilesComponent},
  {path: 'monitors', component: MonitorsComponent},
  {path: 'printers', component: PrintersComponent},  
  {path: 'computers', component: ComputersComponent},  
  {path: 'keyboards', component: KeyboardsComponent},  
  {path: 'mouses', component: MousesComponent},
  {path: 'hdds', component: HddsComponent},
  {path: 'network', component: NetworkComponent},
  {path: 'ups', component: UpsComponent},
  {path: 'motherboards', component: MotherboardsComponent},
  {path: 'towers', component: TowersComponent},
  {path: 'rams', component: RamsComponent},
  {path: 'speakers', component: SpeakersComponent},
  {path: 'prueba', component: PruebaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
