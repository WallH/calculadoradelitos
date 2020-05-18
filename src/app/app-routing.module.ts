import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculadorComponent } from './calculador/calculador.component';


const routes: Routes = [
  { path: '', component: CalculadorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
